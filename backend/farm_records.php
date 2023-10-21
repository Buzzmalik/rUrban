<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rurbanfarms";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch farm records from the 'sensor_data' table
$sql = "SELECT * FROM `sensor_data` ORDER BY `Date` DESC LIMIT 10"; // Change the query as needed
$result = $conn->query($sql);

$farm_records = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $farm_records[] = $row;
    }
}

// Close the database connection
$conn->close();

// Output the farm records as JSON
header('Content-Type: application/json');
echo json_encode($farm_records);
?>
