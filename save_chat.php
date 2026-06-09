<?php

$data = json_decode(file_get_contents("php://input"), true);

$chatId = $data['chat_id'];
$content = $data['content'];

if (!is_dir("chats")) {
    mkdir("chats");
}

file_put_contents(
    "chats/" . $chatId . ".txt",
    $content
);

echo json_encode([
    "success" => true
]);