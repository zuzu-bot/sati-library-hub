<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/auth_helper.php';

$token = Auth::getBearerToken();
$userData = Auth::validateToken($token);

if (!$userData || $userData->role !== 'admin') {
    sendResponse(403, ["message" => "Forbidden. Admin access required."]);
}

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $query = "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse(200, $users);
} else {
    sendResponse(405, ["message" => "Method not allowed."]);
}
?>
