<?php
/* ============================================================
   Stoic Home Care — client/api/submit_qna.php
   Endpoint to handle Q&A form submissions securely
   ============================================================ */

require_once __DIR__ . '/../../config/supabase.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$location = $_POST['location'] ?? '';
$category = $_POST['category'] ?? '';
$question = $_POST['question'] ?? '';
$asker_name = $_POST['asker_name'] ?? 'Anonymous';

if (empty(trim($location)) || empty(trim($category)) || empty(trim($question))) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields.']);
    exit;
}

$supabase = getSupabase();

// Insert as pending so it doesn't show up immediately until answered
$data = [
    'location' => trim($location),
    'category' => trim($category),
    'question' => trim(htmlspecialchars($question)),
    'asker_name' => trim(htmlspecialchars($asker_name)),
    'status' => 'pending',
    'is_expert_answered' => false
];

$success = $supabase->insertQnA($data);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Thank you! Your question has been submitted to our experts.']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to submit question. Please try again.']);
}
