<?php
// Returns TSV list of all files for FTP sync (path, size, md5)
// Usage: curl https://example.com/filelist.php?token=SECRET

$token = 'CHANGE-ME';

if (($_GET['token'] ?? '') !== $token) {
	http_response_code(403);
	die('Forbidden');
}

$root = __DIR__;
$iterator = new RecursiveIteratorIterator(
	new RecursiveDirectoryIterator($root, RecursiveDirectoryIterator::SKIP_DOTS),
	RecursiveIteratorIterator::LEAVES_ONLY
);

$lines = [];
foreach ($iterator as $file) {
	if (!$file->isFile()) continue;
	$path = str_replace($root . '/', '', $file->getPathname());
	// Skip cache, git, src, drafts, Keywords
	if (preg_match('#^(\.git/|app/cache/|src/|drafts/|Keywords/)#', $path)) continue;
	$lines[] = $path . "\t" . $file->getSize() . "\t" . md5_file($file->getPathname());
}

sort($lines);
header('Content-Type: text/plain');
echo implode("\n", $lines);
