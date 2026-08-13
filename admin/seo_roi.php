<?php
/* ============================================================
   Stoic Home Care — admin/seo_roi.php
   Enterprise SEO Revenue Attribution & Lead Dashboard
   ============================================================ */

define('ROOT', __DIR__ . '/..');
require_once ROOT . '/config/config.php';
require_once ROOT . '/config/db.php';
require_once ROOT . '/config/supabase.php';

// Authentication Check (Simplified for demo)
// if (!isset($_SESSION['admin_logged_in'])) { header('Location: login.php'); exit; }

$supabase = getSupabase();
$stats = $supabase->getSeoRoiStats();

// Estimated Ticket Values (Avg Pipeline Value)
$ticketValues = [
    'ICU Setup' => 50000,
    'Home Nursing' => 15000,
    'Elder Care' => 20000,
    'Oxygen Cylinder' => 5000,
    'Oxygen Concentrator' => 10000,
    'Physiotherapy' => 8000,
    'Patient Care' => 12000,
    'Doctor on Call' => 2000,
    'Mother and Baby Care' => 18000
];

$totalLeads = 0;
$totalPipelineValue = 0;

if (is_array($stats)) {
    foreach ($stats as $row) {
        $totalLeads += (int)$row['total_leads'];
        $cat = $row['category'];
        $val = isset($ticketValues[$cat]) ? $ticketValues[$cat] : 5000;
        $totalPipelineValue += ($val * (int)$row['total_leads']);
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SEO Revenue Attribution Dashboard</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        body { background: #f8f9fa; }
        .dashboard-card { border: none; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .text-teal { color: #008080 !important; }
        .bg-teal { background-color: #008080 !important; color: #fff; }
    </style>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="#"><i class="fa-solid fa-chart-line me-2 text-teal"></i>Stoic SEO Command Center</a>
  </div>
</nav>

<div class="container">
    <div class="row mb-4">
        <div class="col-md-6">
            <h2 class="fw-bold">SEO Revenue Attribution</h2>
            <p class="text-muted">Track which local pages are generating the most pipeline value.</p>
        </div>
    </div>

    <!-- High Level Metrics -->
    <div class="row mb-4">
        <div class="col-md-6">
            <div class="card dashboard-card bg-teal">
                <div class="card-body p-4 text-center">
                    <h5 class="card-title text-light">Total Pipeline Generated</h5>
                    <h2 class="display-4 fw-bold">₹<?= number_format($totalPipelineValue) ?></h2>
                    <p class="mb-0 text-light opacity-75">Estimated value based on lead volume</p>
                </div>
            </div>
        </div>
        <div class="col-md-6 mt-4 mt-md-0">
            <div class="card dashboard-card bg-white h-100">
                <div class="card-body p-4 text-center d-flex flex-column justify-content-center">
                    <h5 class="card-title text-muted">Total Organic Leads (Q&A)</h5>
                    <h2 class="display-4 fw-bold text-dark"><?= number_format($totalLeads) ?></h2>
                </div>
            </div>
        </div>
    </div>

    <!-- Attribution Table -->
    <div class="card dashboard-card bg-white">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th class="ps-4 py-3">Location (City)</th>
                            <th class="py-3">Service Category</th>
                            <th class="py-3 text-center">Leads Generated</th>
                            <th class="py-3 text-end">Est. Pipeline Value</th>
                            <th class="py-3 text-end pe-4">Last Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($stats)): ?>
                        <tr>
                            <td colspan="5" class="text-center py-5 text-muted">
                                <i class="fa-solid fa-folder-open fa-3x mb-3 opacity-25"></i>
                                <h5>No data found</h5>
                                <p>Ensure the SQL View is created and Q&A form has submissions.</p>
                            </td>
                        </tr>
                        <?php else: ?>
                            <?php foreach ($stats as $row): 
                                $cat = $row['category'];
                                $leads = (int)$row['total_leads'];
                                $val = isset($ticketValues[$cat]) ? $ticketValues[$cat] : 5000;
                                $rowValue = $leads * $val;
                                
                                // Format Date nicely
                                $date = new DateTime($row['last_lead_date']);
                            ?>
                            <tr>
                                <td class="ps-4 fw-bold text-dark"><?= htmlspecialchars($row['location']) ?></td>
                                <td><span class="badge bg-secondary rounded-pill fw-normal px-3"><?= htmlspecialchars($cat) ?></span></td>
                                <td class="text-center fw-bold text-primary"><?= $leads ?></td>
                                <td class="text-end fw-bold text-success">₹<?= number_format($rowValue) ?></td>
                                <td class="text-end pe-4 text-muted small"><?= $date->format('M d, Y') ?></td>
                            </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
