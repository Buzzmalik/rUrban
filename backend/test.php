
<?php
header('content-type: application/json');
header('access-control-allow-origin: *');
header('access-control-allow-methods: *');
header('access-control-allow-headers: *');



echo json_encode([...$_REQUEST,
    'query' => "select  sum(humidity)/count(*)       as humidity, 
                        sum(temperature)/count(*)    as temperature, 
                        sum(soilmoisture)/count(*)   as soilmoisture, 
                        sum(waterlevel)/count(*)     as waterlevel 
                from sensor_data where Date >= {$_REQUEST['start']} and Date <= {$_REQUEST['end']}"
]);