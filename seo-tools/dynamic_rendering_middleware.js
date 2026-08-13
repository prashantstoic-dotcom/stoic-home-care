const express = require('express');
const prerender = require('prerender-node');
const app = express();

/**
 * Enterprise SEO: Dynamic Rendering Middleware
 * This fulfills the requirement for Single Page Applications (React/Angular CSR)
 * where we need to serve pre-rendered Static HTML to Googlebot, but the fast JS app to users.
 */

// Configure Prerender.io middleware
// It checks the User-Agent. If it's a bot (Googlebot, Bingbot, etc.), 
// it forwards the request to the Prerender service (or local headless Chrome).
app.use(prerender
    .set('prerenderToken', 'YOUR_PRERENDER_API_TOKEN')
    // Whitelist specific bots if needed, or use default list
    // .set('crawlerUserAgents', ['googlebot', 'bingbot', 'yandex', 'baiduspider'])
    // Block static assets from being prerendered to save budget
    .set('prerenderServiceUrl', 'http://localhost:3000/') // If running local prerender server
);

// Serve Static Assets directly
app.use('/static', express.static('build/static'));

// Serve the normal CSR app for human users
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Dynamic Rendering Server running on port ${PORT}`);
    console.log(`Googlebot will receive Static HTML. Users will receive CSR React App.`);
});
