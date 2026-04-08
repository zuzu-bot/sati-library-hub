<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->safeLoad();

class Auth {
    private static function getSecret() {
        return $_ENV['JWT_SECRET'] ?? "YOUR_DEFAULT_SECRET_KEY_FOR_JWT_ENCODING_SATI_LIBRARY_2024";
    }

    public static function generateToken($user_id, $email) {
        $issuer = $_ENV['JWT_ISSUER'] ?? "sati_library";
        $audience = $_ENV['JWT_AUDIENCE'] ?? "sati_library_users";
        $issuedAt = time();
        $expire = $issuedAt + (60 * 60 * 24); // 24 hours

        $payload = [
            "iss" => $issuer,
            "aud" => $audience,
            "iat" => $issuedAt,
            "exp" => $expire,
            "data" => [
                "id" => $user_id,
                "email" => $email
            ]
        ];

        return JWT::encode($payload, self::getSecret(), 'HS256');
    }

    public static function validateToken($token) {
        if (!$token) return null;
        try {
            $decoded = JWT::decode($token, new Key(self::getSecret(), 'HS256'));
            return $decoded->data;
        } catch (Exception $e) {
            return null;
        }
    }

    public static function getBearerToken() {
        $headers = getallheaders();
        if (isset($headers['Authorization'])) {
            if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
                return $matches[1];
            }
        }
        return null;
    }
}

function sendResponse($status, $data) {
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    http_response_code($status);
    echo json_encode($data);
    exit();
}
?>
