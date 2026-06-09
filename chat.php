<?php

header('Content-Type: text/plain');
header('Cache-Control: no-cache');
header('X-Accel-Buffering: no');

$data = json_decode(file_get_contents('php://input'), true);

$message = trim($data['message'] ?? '');

if (!$message) {
    exit;
}

$payload = [
    "model" => "phi3:latest",
    "prompt" => $message,
    "stream" => true,
    "options" => [
        "temperature" => 0.3,
        "num_predict" => 200
    ]
];

$ch = curl_init('http://127.0.0.1:11434/api/generate');

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_RETURNTRANSFER => false,
    CURLOPT_WRITEFUNCTION => function($ch, $data) {

        $lines = explode("\n", trim($data));

        foreach ($lines as $line) {

            if (!$line) {
                continue;
            }

            $json = json_decode($line, true);

            if (isset($json['response'])) {

                echo $json['response'];

                ob_flush();
                flush();
            }
        }

        return strlen($data);
    }
]);

curl_exec($ch);
curl_close($ch);