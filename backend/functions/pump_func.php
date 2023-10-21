<?php

// require_once "../pump/esp-database.php";

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rurbanfarms";

// Create connection
// global $conn;
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function checkmanual() {

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "rurbanfarms";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $check_mode = "SELECT state FROM outputs WHERE name = 'MODE'"; 
    $results = $conn->query($check_mode);
    $results->data_seek(0);
    $state = $results->fetch_array(MYSQLI_ASSOC)['state'];
    
    if ($state == 0){
        $update_mode = "UPDATE outputs SET state = 1 WHERE name = 'MODE'";
        $conn->query($update_mode);
    }



}

function startPump() {

    checkmanual();

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "rurbanfarms";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "UPDATE outputs SET state='0' WHERE name='PUMP'";
    $conn->query($sql);

    $conn->close();

    // $result = getAllOutputs();
    // if($result){
    //     while ($row = $result->fetch_assoc()) {
    //         if ($)
    //             $row["state"] == "0";
    //         else {
    //             $row["state"] == "1";
    //         }
    
    //     }
    // } 
}  

function stopPump(){

    checkmanual();

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "rurbanfarms";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "UPDATE outputs SET state='1' WHERE name='PUMP'";
    $conn->query($sql);

    $conn->close();
}


?>