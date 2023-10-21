<?php

require_once 'config.php';
require_once 'functions.php';
require_once 'reads.php';
require_once 'create.php';
require_once 'edits.php';
require_once 'delete.php';



$router = [
    "sensor_data"           => $sensor_data,
    "average_sensor_data"   => $average_sensor_data,
    "new_schedule"          => $new_schedule,
    "edit_schedule"         => $edit_schedule,
    "delete_schedule"       => $delete_schedule,
    "schedules"             => $schedules,
    "schedule"              => $schedule,
    "new_user"              => $new_user,
    "delete_user"           => $delete_user,
    "edit_user"             => $edit_user,
    "users"                 => $users,
    "login"                 => $login,
];



$flag = $_REQUEST['flag'] ?? '';

$result = $router[$flag] ?? $router['sensor_data'];


echo json_encode($result());