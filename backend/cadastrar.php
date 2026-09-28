<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/config.php';
if (!DATA_COLLECTION_ENABLED) {
    http_response_code(503);
    echo json_encode(['ok' => false, 'message' => 'Coleta de dados desativada.'], JSON_UNESCAPED_UNICODE);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Método não permitido.'], JSON_UNESCAPED_UNICODE);
    exit;
}
require_once __DIR__ . '/conexao.php';
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) $input = $_POST;
$name = trim((string)($input['name'] ?? $input['nome'] ?? ''));
$age = filter_var($input['age'] ?? $input['idade'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 10, 'max_range' => 99]]);
$school = trim((string)($input['school'] ?? $input['escola'] ?? ''));
$grade = trim((string)($input['grade'] ?? $input['serie'] ?? ''));
$primary = trim((string)($input['primary_result'] ?? ''));
$secondary = trim((string)($input['secondary_result'] ?? ''));
$scores = $input['scores'] ?? [];
if ($name === '' || $age === false) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Nome e idade válidos são obrigatórios para gravação.'], JSON_UNESCAPED_UNICODE);
    exit;
}
$scoresJson = json_encode($scores, JSON_UNESCAPED_UNICODE);
$stmt = $conn->prepare('INSERT INTO students (name, age, school, grade, primary_result, secondary_result, scores_json) VALUES (?, ?, ?, ?, ?, ?, ?)');
$stmt->bind_param('sisssss', $name, $age, $school, $grade, $primary, $secondary, $scoresJson);
$stmt->execute();
echo json_encode(['ok' => true, 'id' => $stmt->insert_id], JSON_UNESCAPED_UNICODE);
