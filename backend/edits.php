<?php

$edit_schedule = function () {

    $start     = clean_time($_REQUEST['start'] ?? '');
    $end       = clean_time($_REQUEST['end']   ?? '');
    $name      = $_REQUEST['name']  ?? '';
    $id        = $_REQUEST['id']  ?? '';
    $status    = $_REQUEST['status']  ?? '';

    if(is_empty($start) || is_empty($end) || is_empty($name))
    {
        return [
            'icon' => 'error',
            'title'  => 'Empty Inputs',
            'text'   => 'Please check your inputs and try again.'
        ];
    }

    // check to see if the start date falls between any other schedule on the system
    $start_exists = get_result("select * from schedules where (start <= ? and end >= ?) and id != ?", [$start, $start, $id]);

    // check to see if the end date falls between any other schedule on the system
    $end_exists   = get_result("select * from schedules where (start <= ? and end >= ?) and id != ?", [$end, $end, $id]);

    if(count($start_exists) > 0) {
        return [
            'icon' => 'error',
            'title' => 'Start Date Falls Between Another Schedule',
            'text' => 'Please choose a different start date and try again',
        ];
    }

    if(count($end_exists) > 0) {
        return [
            'icon' => 'error',
            'title' => 'End Date Falls Between Another Schedule',
            'text' => 'Please choose a different end date and try again',
        ];
    }


    if(query("update schedules set name = ?, start = ?, end = ?, status = ? where id = ? ", [$name, $start, $end, $status, $id]))
    { 
        return [
            'icon' => 'success',
            'title'  => 'Schedule Updated',
            'text'   => "'$name' has been updated successfully"
        ];
    }
    else {
        return [
            'icon' => 'error',
            'title'  => 'System Busy',
            'text'   => 'System is currently busy, please try again later'
        ];
    }

};


$edit_user = function () {

    $name      = $_REQUEST['name']  ?? '';
    $password  = $_REQUEST['password']  ?? '';
    $id        = $_REQUEST['id']  ?? '';

    if(is_empty($name))
    {
        return [
            'icon' => 'error',
            'title'  => 'No Name Provided',
            'text'   => 'Please check your name input and try again.'
        ];
    }

    
    $sql = "";
    $params = [$name, $id];
    $result = "no password";
    
    if(!is_empty($password)) {

        $password = base64_encode($password . "abdulencryptedkeyalgorithm");
        $sql = ", password = ? ";
        $params = [$name, $password, $id];
        $result = 'include password';
    }

    if(query("update users set name = ? $sql where id = ? ", $params))
    { 
        return [
            'icon' => 'success',
            'title'  => 'User Updated',
            'text'   => "'$name' has been updated successfully",
            'text' => $result
        ];
    }
    else {
        return [
            'icon' => 'error',
            'title'  => 'System Busy',
            'text'   => 'System is currently busy, please try again later'
        ];
    }

};