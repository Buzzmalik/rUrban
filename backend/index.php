<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>rUrban Farm Irrigation</title>
    
    <link href="esp-style.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
        <a class="navbar-brand" href="#">rUrban Farms</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#farm-records">Farm Records</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#control-center">Control Center</a>
                </li>
            </ul>
        </div>
</div>

</nav>
<!-- <section id="farm-records" class="py-5">
    <div class="container">
        <h2 class="mb-4" id="farmrecords">Farm Records(Previous 10)</h2>
        <span id="farm-records-content"></span>
    </div>
</section> -->
<section id="farm-records" class="py-5">
    <div class="container">
        <h2 class="mb-4" id="farmrecords">Farm Records (Previous 10)</h2>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Humidity</th>
                    <th>Temperature</th>
                    <th>Soil Moisture</th>
                    <th>Water Level</th>
                </tr>
            </thead>
            <tbody id="farm-records-content">
                <!-- Farm records data will be inserted here dynamically using JavaScript -->
            </tbody>
        </table>
    </div>
</section>
<?php
include_once('esp-database.php');

session_start(); //initialize the session

$result = getAllOutputs();
$html_buttons = null;
if ($result) {
    while ($row = $result->fetch_assoc()) {
        
        if ($row['state'] == "0") {
            $button_checked = "checked";
        } else {
            $button_checked = "unchecked";
        }
        $html_buttons .= '<h3>' . $row["name"] . ' - Board ' . $row["board"] . ' - GPIO ' . $row["gpio"] . 
        ' </h3><label class="slider-checkbox"><input type="checkbox" onchange="updateOutput(this)" id="' . $row["id"] . '" ' . 
        $button_checked . '><span class="slider"></span></label> <br><br><br><br><br><br>';
    }
}

$result2 = getAllBoards();
$html_boards = null;
if ($result2) {
    $html_boards .= '<h3>Boards</h3>';
    while ($row = $result2->fetch_assoc()) {
        $row_reading_time = $row["last_request"];
        $html_boards .= '<p><strong>Board ' . $row["board"] . '</strong> - Last Request Time: ' . $row_reading_time . '</p>';
    }
}
?>

<section id="control-center" class="py-5">
    <div class="container">
        <h2 class="mb-4">Control Center</h2>
        <center><h2>rUrban Control System</h2></center>
        <center>
            ENABLE AUTOMATIC CONTROL
            <?php echo $html_buttons; ?>
            <?php echo $html_boards; ?> 
            <center>
                <br><br>
    </div>
</section>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script>
    // Use AJAX to fetch farm records from the PHP file
    fetch('farm_records.php')
        .then(response => response.json())
        .then(data => {
            // Process the farm records and create the HTML content
            let farmRecordsContent = '';
            data.forEach(record => {
                farmRecordsContent += `
                    <tr>
                        <td>${record.Date}</td>
                        <td>${record.humidity}</td>
                        <td>${record.temperature}</td>
                        <td>${record.soilmoisture}</td>
                        <td>${record.waterlevel}</td>
                    </tr>
                `;
            });

            // Insert the generated HTML content into the farm records table body
            document.getElementById('farm-records-content').innerHTML = farmRecordsContent;
        })
        .catch(error => console.error('Error fetching farm records:', error));

    // Use AJAX to fetch farm records from the PHP file
    // fetch('farm_records.php')
    //     .then(response => response.json())
    //     .then(data => {
    //         // Process the farm records and create the HTML content
    //         let farmRecordsContent = '';
    //         data.forEach(record => {
    //             farmRecordsContent += `
    //                 <p>Date: ${record.Date}</p>
    //                 <p>Humidity: ${record.humidity}</p>
    //                 <p>Temperature: ${record.temperature}</p>
    //                 <p>Soil Moisture: ${record.soilmoisture}</p>
    //                 <p>Water Level: ${record.waterlevel}</p>
    //                 <hr>
    //             `;
    //         });

            // Insert the generated HTML content into the farm records section
    //         document.getElementById('farm-records-content').innerHTML = farmRecordsContent;
    //     })
    //     .catch(error => console.error('Error fetching farm records:', error));

    function updateOutput(element) {
    var xhr = new XMLHttpRequest();
    if (element.checked) {
        xhr.open("GET", "esp-outputs-action.php?action=output_update&id=" + element.id + "&state=0", true);
    }
    else {
        xhr.open("GET", "esp-outputs-action.php?action=output_update&id=" + element.id + "&state=1", true);
    }
    xhr.send();
    }
</script>
</body>
</html>
