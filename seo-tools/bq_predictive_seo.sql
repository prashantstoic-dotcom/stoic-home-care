-- Top 0.015% Enterprise SEO: Predictive Analytics via BigQuery ML
-- Goal: Predict future SEO traffic drops for top URLs and alert the team 
-- BEFORE the drop happens using ARIMA_PLUS time series forecasting.

-- 1. Create the Machine Learning Model
CREATE OR REPLACE MODEL `seo_data_lake.predictive_traffic_model`
OPTIONS(
  model_type='ARIMA_PLUS',
  time_series_timestamp_col='date',
  time_series_data_col='clicks',
  time_series_id_col='url',
  data_frequency='DAILY',
  horizon=14, -- Predict 14 days into the future
  auto_arima=TRUE
) AS
SELECT
  date,
  url,
  clicks
FROM
  `seo_data_lake.gsc_historical_data`
WHERE
  date >= DATE_SUB(CURRENT_DATE(), INTERVAL 365 DAY)
  AND url IN (
    -- Train only on top 1000 traffic-driving URLs to save compute
    SELECT url FROM `seo_data_lake.gsc_historical_data` 
    GROUP BY url ORDER BY SUM(clicks) DESC LIMIT 1000
  );

-- 2. Run Predictions and Find Anomalies / Drops
-- We compare the forecasted traffic with historical averages.
-- If the forecast predicts a drop of > 30%, flag it for the Slack alert script.
SELECT
  url,
  forecast_timestamp AS predicted_date,
  forecast_value AS predicted_clicks,
  prediction_interval_lower_bound,
  prediction_interval_upper_bound
FROM
  ML.FORECAST(MODEL `seo_data_lake.predictive_traffic_model`, STRUCT(14 AS horizon))
WHERE
  forecast_value < (
    -- Subquery to find the 30-day historical average for this URL
    SELECT AVG(clicks) * 0.7 
    FROM `seo_data_lake.gsc_historical_data` hist
    WHERE hist.url = url AND hist.date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
  )
ORDER BY
  predicted_clicks ASC;
