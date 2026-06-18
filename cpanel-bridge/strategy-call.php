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

function getAuthorizationHeader(): string
{
    if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        return (string) $_SERVER['HTTP_AUTHORIZATION'];
    }

    if (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        return (string) $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    }

    if (function_exists('getallheaders')) {
        $headers = getallheaders();
        if (is_array($headers)) {
            foreach ($headers as $key => $value) {
                if (strcasecmp((string) $key, 'Authorization') === 0) {
                    return (string) $value;
                }
            }
        }
    }

    if (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        if (is_array($headers)) {
            foreach ($headers as $key => $value) {
                if (strcasecmp((string) $key, 'Authorization') === 0) {
                    return (string) $value;
                }
            }
        }
    }

    return '';
}

function isAuthorized(): bool
{
    $auth = getAuthorizationHeader();
    if ($auth === 'Bearer ' . BRIDGE_SECRET) {
        return true;
    }

    // Fallback when Apache/cPanel does not pass Authorization to PHP
    $token = $_GET['token'] ?? $_POST['token'] ?? '';
    return is_string($token) && hash_equals(BRIDGE_SECRET, $token);
}

// --- Configure (match your cPanel MySQL user/database) ---
const BRIDGE_SECRET = 'CHANGE_ME_TO_A_LONG_RANDOM_SECRET';
const DB_HOST = 'localhost';
const DB_NAME = 'serverlinktestwe_bmybrand_leads';
const DB_USER = 'serverlinktestwe_bmybrand_leads';
const DB_PASS = 'YOUR_CPANEL_DB_PASSWORD';

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
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (!isAuthorized()) {
    http_response_code(401);
    echo json_encode([
        'error' => 'Unauthorized',
        'hint' => 'Use Authorization: Bearer <BRIDGE_SECRET>, or ?health=1&token=<BRIDGE_SECRET> for testing.',
        'receivedAuth' => getAuthorizationHeader() !== '' ? 'header-present' : 'header-missing',
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['checkIp'])) {
    $ipAddress = trim((string) ($_GET['checkIp'] ?? ''));
    $hours = max(1, min(168, (int) ($_GET['hours'] ?? 24)));
    if ($ipAddress === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Missing checkIp parameter']);
        exit;
    }

    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($mysqli->connect_error) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }
    $mysqli->set_charset('utf8mb4');

    $stmt = $mysqli->prepare(
        'SELECT id FROM strategy_call_bookings WHERE ip_address = ? AND created_at >= DATE_SUB(NOW(), INTERVAL ? HOUR) LIMIT 1'
    );
    $stmt->bind_param('si', $ipAddress, $hours);
    $stmt->execute();
    $result = $stmt->get_result();
    $exists = $result && $result->num_rows > 0;
    $stmt->close();
    $mysqli->close();

    echo json_encode(['exists' => $exists]);
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

function connectDatabase(): mysqli
{
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($mysqli->connect_error) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }
    $mysqli->set_charset('utf8mb4');
    return $mysqli;
}

function mapBookingRow(array $row): array
{
    return [
        'id' => (int) ($row['id'] ?? 0),
        'email' => (string) ($row['email'] ?? ''),
        'name' => (string) ($row['name'] ?? ''),
        'countryCode' => (string) ($row['country_code'] ?? ''),
        'phone' => (string) ($row['phone'] ?? ''),
        'companyName' => (string) ($row['company_name'] ?? ''),
        'websiteUrl' => (string) ($row['website_url'] ?? ''),
        'budget' => (string) ($row['budget'] ?? ''),
        'callNotes' => (string) ($row['call_notes'] ?? ''),
        'source' => (string) ($row['source'] ?? ''),
        'appointmentDate' => (string) ($row['appointment_date'] ?? ''),
        'appointmentTime' => (string) ($row['appointment_time'] ?? ''),
        'timezone' => (string) ($row['timezone'] ?? ''),
        'calendarEventId' => (string) ($row['calendar_event_id'] ?? ''),
        'createdAt' => (string) ($row['created_at'] ?? ''),
    ];
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $bookingId = (int) ($_GET['id'] ?? 0);
    if ($bookingId < 1) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid booking id']);
        exit;
    }

    $mysqli = connectDatabase();
    $stmt = $mysqli->prepare(
        'SELECT id, email, name, country_code, phone, company_name, website_url,
                budget, call_notes, source, appointment_date, appointment_time, timezone,
                calendar_event_id, created_at
         FROM strategy_call_bookings WHERE id = ? LIMIT 1'
    );
    $stmt->bind_param('i', $bookingId);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result ? $result->fetch_assoc() : null;
    $stmt->close();
    $mysqli->close();

    if (!is_array($row)) {
        http_response_code(404);
        echo json_encode(['error' => 'Booking not found']);
        exit;
    }

    echo json_encode(['booking' => mapBookingRow($row)]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['list'])) {
    $from = trim((string) ($_GET['from'] ?? ''));
    $to = trim((string) ($_GET['to'] ?? ''));
    $mysqli = connectDatabase();

    $sql = 'SELECT id, email, name, country_code, phone, company_name, website_url,
                   budget, call_notes, source, appointment_date, appointment_time, timezone,
                   calendar_event_id, created_at
            FROM strategy_call_bookings
            WHERE appointment_date IS NOT NULL';
    $types = '';
    $params = [];

    if ($from !== '') {
        $sql .= ' AND appointment_date >= ?';
        $types .= 's';
        $params[] = $from;
    }
    if ($to !== '') {
        $sql .= ' AND appointment_date <= ?';
        $types .= 's';
        $params[] = $to;
    }

    $sql .= ' ORDER BY appointment_date ASC, appointment_time ASC, id ASC';

    $stmt = $mysqli->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Prepare failed', 'details' => $mysqli->error]);
        $mysqli->close();
        exit;
    }

    if ($types !== '') {
        $stmt->bind_param($types, ...$params);
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $bookings = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            if (is_array($row)) {
                $bookings[] = mapBookingRow($row);
            }
        }
    }
    $stmt->close();
    $mysqli->close();

    echo json_encode(['bookings' => $bookings]);
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

if (($data['action'] ?? '') === 'delete') {
    $deleteId = (int) ($data['id'] ?? 0);
    if ($deleteId < 1) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid booking id']);
        exit;
    }

    $mysqli = connectDatabase();
    $stmt = $mysqli->prepare('DELETE FROM strategy_call_bookings WHERE id = ? LIMIT 1');
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Prepare failed', 'details' => $mysqli->error]);
        $mysqli->close();
        exit;
    }

    $stmt->bind_param('i', $deleteId);
    $stmt->execute();
    $deleted = $stmt->affected_rows > 0;
    $stmt->close();
    $mysqli->close();

    if (!$deleted) {
        http_response_code(404);
        echo json_encode(['error' => 'Booking not found']);
        exit;
    }

    echo json_encode(['ok' => true, 'id' => $deleteId]);
    exit;
}

if (($data['action'] ?? '') === 'updateCalendarEventId') {
    $updateId = (int) ($data['id'] ?? 0);
    $calendarEventId = trim((string) ($data['calendarEventId'] ?? ''));
    if ($updateId < 1 || $calendarEventId === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid booking id or calendar event id']);
        exit;
    }

    $mysqli = connectDatabase();
    $stmt = $mysqli->prepare(
        'UPDATE strategy_call_bookings SET calendar_event_id = ? WHERE id = ? LIMIT 1'
    );
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Prepare failed', 'details' => $mysqli->error]);
        $mysqli->close();
        exit;
    }

    $stmt->bind_param('si', $calendarEventId, $updateId);
    $stmt->execute();
    $updated = $stmt->affected_rows > 0;
    $stmt->close();
    $mysqli->close();

    if (!$updated) {
        http_response_code(404);
        echo json_encode(['error' => 'Booking not found']);
        exit;
    }

    echo json_encode(['ok' => true, 'id' => $updateId, 'calendarEventId' => $calendarEventId]);
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
    'ipAddress' => trim((string) ($data['ipAddress'] ?? '')),
];

$required = [
    'email', 'name', 'phone', 'companyName',
    'budget', 'callNotes', 'source', 'appointmentDate', 'appointmentTime', 'timezone',
];

foreach ($required as $key) {
    if ($payload[$key] === '') {
        http_response_code(400);
        echo json_encode(['error' => "Missing field: {$key}"]);
        exit;
    }
}

$mysqli = connectDatabase();
$ipAddress = $payload['ipAddress'];
if ($ipAddress !== '') {
    $hours = 24;
    $check = $mysqli->prepare(
        'SELECT id FROM strategy_call_bookings WHERE ip_address = ? AND created_at >= DATE_SUB(NOW(), INTERVAL ? HOUR) LIMIT 1'
    );
    $check->bind_param('si', $ipAddress, $hours);
    $check->execute();
    $existing = $check->get_result();
    if ($existing && $existing->num_rows > 0) {
        http_response_code(429);
        echo json_encode([
            'error' => 'A strategy call booking was already submitted from this network in the last 24 hours.',
        ]);
        $check->close();
        $mysqli->close();
        exit;
    }
    $check->close();
}

$stmt = $mysqli->prepare(
    'INSERT INTO strategy_call_bookings (
        email, name, country_code, phone, company_name, website_url,
        budget, call_notes, source, appointment_date, appointment_time, timezone, ip_address
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Prepare failed', 'details' => $mysqli->error]);
    exit;
}

$countryCode = $payload['countryCode'];

$stmt->bind_param(
    'sssssssssssss',
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
    $payload['timezone'],
    $ipAddress
);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(['error' => 'Insert failed', 'details' => $stmt->error]);
    $stmt->close();
    $mysqli->close();
    exit;
}

$id = $stmt->insert_id;
$stmt->close();
$mysqli->close();

echo json_encode(['ok' => true, 'id' => $id]);
