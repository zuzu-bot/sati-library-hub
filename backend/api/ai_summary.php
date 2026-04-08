<?php
require_once __DIR__ . '/../utils/auth_helper.php';

$token = Auth::getBearerToken();
$userData = Auth::validateToken($token);

if (!$userData) {
    sendResponse(401, ["message" => "Unauthorized."]);
}

$data = json_decode(file_get_contents("php://input"));
$title = $data->title ?? '';

if (empty($title)) {
    sendResponse(400, ["message" => "Book title is required."]);
}

$apiKey = $_ENV['GEMINI_API_KEY'] ?? null;

if ($apiKey) {
    $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . $apiKey;

    $payload = [
        "contents" => [
            [
                "parts" => [
                    ["text" => "Provide a short 3-5 line summary of the book titled: " . $title]
                ]
            ]
        ]
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        $result = json_decode($response, true);
        $summary = $result['candidates'][0]['content']['parts'][0]['text'] ?? null;
        if ($summary) {
            sendResponse(200, ["summary" => trim($summary)]);
        }
    }
}

// Fallback / Mock
$mockSummaries = [
    "The Great Gatsby" => "A story of wealth, love, and the American Dream in the 1920s, centered on the mysterious Jay Gatsby and his obsession with Daisy Buchanan.",
    "1984" => "A dystopian novel exploring themes of totalitarianism, surveillance, and the repression of individualism in a society ruled by Big Brother.",
    "To Kill a Mockingbird" => "A profound look at racial injustice and the loss of innocence in the American South, seen through the eyes of young Scout Finch.",
    "Pride and Prejudice" => "A classic tale of manners, marriage, and misconceptions in 19th-century England, following the spirited Elizabeth Bennet and Mr. Darcy."
];

$summary = $mockSummaries[$title] ?? "This is an AI-generated summary for '$title'. It explores the key themes and narratives of the book in a concise and engaging manner, perfect for a quick overview.";

sendResponse(200, ["summary" => $summary, "mocked" => true]);
?>
