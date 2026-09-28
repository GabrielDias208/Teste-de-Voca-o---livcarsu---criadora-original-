<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';
if (!DATA_COLLECTION_ENABLED) {
    http_response_code(503);
    exit('Coleta de dados está desativada em backend/config.php.');
}
require_once __DIR__ . '/conexao.php';
function e(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
$total = (int)$conn->query('SELECT COUNT(*) total FROM students')->fetch_assoc()['total'];
$results = $conn->query('SELECT primary_result, COUNT(*) total FROM students GROUP BY primary_result ORDER BY total DESC');
$students = $conn->query('SELECT name, age, school, grade, primary_result, secondary_result, created_at FROM students ORDER BY created_at DESC LIMIT 500');
?>
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Relatório — Vocação Polar</title><style>body{font-family:system-ui;margin:0;background:#f3f8fa;color:#17304f}.wrap{max-width:1100px;margin:auto;padding:32px}.card{background:#fff;border:1px solid #dce7ec;border-radius:18px;padding:22px;margin:18px 0;overflow:auto}table{width:100%;border-collapse:collapse}th,td{padding:11px 10px;border-bottom:1px solid #e5edf0;text-align:left}th{color:#49617a}h1,h2{color:#173a69}.total{font-size:2rem;font-weight:900}</style></head><body><main class="wrap"><h1>Relatório Vocação Polar</h1><div class="card"><div>Total de respostas</div><div class="total"><?= $total ?></div></div><div class="card"><h2>Resultados principais</h2><table><tr><th>Curso</th><th>Total</th></tr><?php while($r=$results->fetch_assoc()): ?><tr><td><?= e((string)$r['primary_result']) ?></td><td><?= (int)$r['total'] ?></td></tr><?php endwhile; ?></table></div><div class="card"><h2>Respostas recentes</h2><table><tr><th>Nome</th><th>Idade</th><th>Escola</th><th>Série</th><th>1º resultado</th><th>2º resultado</th><th>Data</th></tr><?php while($r=$students->fetch_assoc()): ?><tr><td><?= e((string)$r['name']) ?></td><td><?= (int)$r['age'] ?></td><td><?= e((string)$r['school']) ?></td><td><?= e((string)$r['grade']) ?></td><td><?= e((string)$r['primary_result']) ?></td><td><?= e((string)$r['secondary_result']) ?></td><td><?= e((string)$r['created_at']) ?></td></tr><?php endwhile; ?></table></div></main></body></html>
