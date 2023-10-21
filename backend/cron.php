<?php

require_once "config.php";
require_once "functions.php";


$schedules = get_result("select * from schedules where start <= now() and end >= now() and status = 'active' ");


$action_taken = false;

if (
    count($schedules) > 0 && 
    query("update outputs set state = 0 where name = 'PUMP'") &&
    query("update outputs set state = 1 where name = 'MODE'") &&
    query("update schedules set status='executing' where start <= now() and end >= now() and status = 'active' ")
) {
    echo json_encode([
        'state' => "Pump turned on",
        'time'  => date('Y-m-d H:i:s')
    ]);

    $action_taken = true;
}

$executing = get_result("select * from schedules where end <= now() and status = 'executing' ");
$schedules = get_result("select * from schedules where start <= now() and end >= now() and status = 'active' ");


if( 
    count($executing) > 0 &&
    count($schedules) <= 0 &&
    query("update outputs set state = 1 where name = 'PUMP'") &&
    query("update schedules set status='executed' where end <= now() and status = 'executing' ")
) {
    echo json_encode([
        'state' => "Pump turned off",
        'time'  => date('Y-m-d H:i:s')
    ]);

    $action_taken = true;
}


if(!$action_taken) {
    echo json_encode([
        'state' => 'No Schedule now',
        'time'  => date('Y-m-d H:i:s')
    ]);
}