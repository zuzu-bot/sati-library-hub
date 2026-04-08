<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/auth_helper.php';

$token = Auth::getBearerToken();
$userData = Auth::validateToken($token);

if (!$userData) {
    sendResponse(401, ["message" => "Unauthorized."]);
}

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $query = "SELECT * FROM books WHERE id = :id AND user_id = :user_id LIMIT 1";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $_GET['id']);
            $stmt->bindParam(':user_id', $userData->id);
        } else {
            $query = "SELECT * FROM books WHERE user_id = :user_id ORDER BY created_at DESC";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':user_id', $userData->id);
        }
        $stmt->execute();
        $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
        sendResponse(200, $books);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->title) && !empty($data->author)) {
            $query = "INSERT INTO books (title, author, user_id) VALUES (:title, :author, :user_id)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':title', $data->title);
            $stmt->bindParam(':author', $data->author);
            $stmt->bindParam(':user_id', $userData->id);
            if ($stmt->execute()) {
                sendResponse(201, ["message" => "Book added successfully."]);
            } else {
                sendResponse(500, ["message" => "Unable to add book."]);
            }
        } else {
            sendResponse(400, ["message" => "Incomplete data."]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->id) && !empty($data->title) && !empty($data->author)) {
            $query = "UPDATE books SET title = :title, author = :author WHERE id = :id AND user_id = :user_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':title', $data->title);
            $stmt->bindParam(':author', $data->author);
            $stmt->bindParam(':id', $data->id);
            $stmt->bindParam(':user_id', $userData->id);
            if ($stmt->execute()) {
                sendResponse(200, ["message" => "Book updated successfully."]);
            } else {
                sendResponse(500, ["message" => "Unable to update book."]);
            }
        } else {
            sendResponse(400, ["message" => "Incomplete data."]);
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $query = "DELETE FROM books WHERE id = :id AND user_id = :user_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $_GET['id']);
            $stmt->bindParam(':user_id', $userData->id);
            if ($stmt->execute()) {
                sendResponse(200, ["message" => "Book deleted successfully."]);
            } else {
                sendResponse(500, ["message" => "Unable to delete book."]);
            }
        } else {
            sendResponse(400, ["message" => "Incomplete data."]);
        }
        break;

    default:
        sendResponse(405, ["message" => "Method not allowed."]);
        break;
}
?>
