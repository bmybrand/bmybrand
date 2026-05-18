<?php
/**
 * Upload to cPanel: public_html/api/strategy-call.php
 * Create folder "api" if needed.
 *
 * cPanel → MySQL: uses localhost (works on the server).
 * Vercel: set MYSQL_BRIDGE_URL=https://serverlinktestwebsites.com/api/strategy-call.php
 *         and MYSQL_BRIDGE_SECRET to a long random string (same in this file).
 */

declare(strict_types=1);

// --- Configure (match your cPanel MySQL user/database) ---
const BRIDGE_SECRET = 'sbArA0cAh3xfqoXKdmOG';
const DB_HOST = 'localhost';
const DB_NAME = 'serverlinktestwe_bmybrand_leads';
const DB_USER = 'serverlinktestwe_bmybrand_leads';
const DB_PASS = 'N_~zF&UwTWmlq!#]';

header('Content-Type: application/json; charset=utf-8');

$allowedOrigins = [
    'https://bmybrand.vercel.app',
    'https://www.bmybrand.com',
    'https://bmybrand.com',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
if ($auth !== 'Bearer ' . BRIDGE_SECRET) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['health'])) {
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($mysqli->connect_error) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Database connection failed']);
        exit;
    }
    $result = $mysqli->query("SHOW TABLES LIKE 'strategy_call_bookings'");
    $tableExists = $result && $result->num_rows > 0;
    $mysqli->close();
    echo json_encode(['ok' => true, 'mode' => 'cpanel-bridge', 'tableExists' => $tableExists]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body']);
    exit;
}

$payload = [
    'email' => trim((string) ($data['email'] ?? '')),
    'name' => trim((string) ($data['name'] ?? '')),
    'countryCode' => trim((string) ($data['countryCode'] ?? '')),
    'phone' => trim((string) ($data['phone'] ?? '')),
    'companyName' => trim((string) ($data['companyName'] ?? '')),
    'websiteUrl' => trim((string) ($data['websiteUrl'] ?? '')),
    'budget' => trim((string) ($data['budget'] ?? '')),
    'callNotes' => trim((string) ($data['callNotes'] ?? '')),
    'source' => trim((string) ($data['source'] ?? '')),
    'appointmentDate' => trim((string) ($data['appointmentDate'] ?? '')),
    'appointmentTime' => trim((string) ($data['appointmentTime'] ?? '')),
    'timezone' => trim((string) ($data['timezone'] ?? '')),
];

$required = [
    'email', 'name', 'phone', 'companyName', 'websiteUrl',
    'budget', 'callNotes', 'source', 'appointmentDate', 'appointmentTime', 'timezone',
];

foreach ($required as $key) {
    if ($payload[$key] === '') {
        http_response_code(400);
        echo json_encode(['error' => "Missing field: {$key}"]);
        exit;
    }
}

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}
$mysqli->set_charset('utf8mb4');

$stmt = $mysqli->prepare(
    'INSERT INTO strategy_call_bookings (
        email, name, country_code, phone, company_name, website_url,
        budget, call_notes, source, appointment_date, appointment_time, timezone
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Prepare failed']);
    exit;
}

$countryCode = $payload['countryCode'];

$stmt->bind_param(
    'ssssssssssss',
    $payload['email'],
    $payload['name'],
    $countryCode,
    $payload['phone'],
    $payload['companyName'],
    $payload['websiteUrl'],
    $payload['budget'],
    $payload['callNotes'],
    $payload['source'],
    $payload['appointmentDate'],
    $payload['appointmentTime'],
    $payload['timezone']
);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(['error' => 'Insert failed']);
    $stmt->close();
    $mysqli->close();
    exit;
}

$id = $stmt->insert_id;
$stmt->close();
$mysqli->close();

echo json_encode(['ok' => true, 'id' => $id]);
