<?php
require_once __DIR__ . '/../utils/auth_helper.php';

$token = Auth::getBearerToken();
$userData = Auth::validateToken($token);

if (!$userData) {
    sendResponse(401, ["message" => "Unauthorized."]);
}

$recommendations = [
    ["id" => 101, "title" => "The AI Revolution", "author" => "Future Author"],
    ["id" => 102, "title" => "Neural Networks for Beginners", "author" => "Data Scientist"],
    ["id" => 103, "title" => "Robotic Dreams", "author" => "Isaac Asimov"]
];

sendResponse(200, $recommendations);
?>
