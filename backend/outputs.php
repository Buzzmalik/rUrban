<?php
error_reporting(E_ALL); 
error_reporting(-1); 
ini_set('error_reporting', E_ALL);

include_once('esp-database.php');

session_start(); 



$outputs = getAllOutputs()->fetch_all(MYSQLI_ASSOC);
$boards  = getAllBoards()->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    'outputs' =>$outputs,
    'boards'  =>$boards,
]);

?>
