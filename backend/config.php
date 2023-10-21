<?php
error_reporting(E_ALL); 
error_reporting(-1); 
ini_set('error_reporting', E_ALL);


header('access-control-allow-origin: http://localhost:5173');
header('access-control-allow-methods: GET, POST');
header('access-control-allow-headers: content-type');
header('content-type: application/json');


$credentials = [
    'localhost',
    'root',
    '',
    'rurban',
];

    
$conn = new mysqli(...$credentials);


if ($conn->connect_error) {
    
    echo json_encode([
        'status' => 'error',
        'title'  => 'System Error',
        'text'   => 'System is currently unavailable, please try again later'
    ]);

    exit;
}
