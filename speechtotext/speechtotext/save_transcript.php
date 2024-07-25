<?php
header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$text = $data['text'];

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "speech_to_text";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

$sql = "INSERT INTO transcripts (text) VALUES ('$text')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'message' => 'Transcript saved successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
}

$conn->close();
?>
