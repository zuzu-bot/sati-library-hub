<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/auth_helper.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->email) && !empty($data->password)) {
    $query = "INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, :role)";
    $stmt = $db->prepare($query);

    $password_hash = password_hash($data->password, PASSWORD_BCRYPT);
    $role = $data->role ?? 'student';

    $stmt->bindParam(':name', $data->name);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':password', $password_hash);
    $stmt->bindParam(':role', $role);

    try {
        if ($stmt->execute()) {
            sendResponse(201, ["message" => "User registered successfully."]);
        } else {
            sendResponse(500, ["message" => "Unable to register user."]);
        }
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            sendResponse(400, ["message" => "Email already exists."]);
        }
        sendResponse(500, ["message" => "Database error: " . $e->getMessage()]);
    }
} else {
    sendResponse(400, ["message" => "Incomplete data."]);
}
?>
