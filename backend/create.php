<?php

$new_schedule = function () {

    $start = clean_time($_REQUEST['start'] ?? '');
    $end   = clean_time($_REQUEST['end']   ?? '');
    $name  = $_REQUEST['name']  ?? '';

    if(is_empty($start) || is_empty($end) || is_empty($name))
    {
        return [
            'icon' => 'error',
            'title'  => 'Empty Inputs',
            'text'   => 'Please check your inputs and try again.'
        ];
    }

    // check to see if the start date falls between any other schedule on the system
    $start_exists = get_result("select * from schedules where (start <= ? and end >= ?)", [$start, $start]);

    // check to see if the end date falls between any other schedule on the system
    $end_exists   = get_result("select * from schedules where (start <= ? and end >= ?)", [$end, $end] );

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


    if(query("insert into schedules set name = ?, start = ?, end = ?", [$name, $start, $end]))
    { 
        return [
            'icon' => 'success',
            'title'  => 'Schedule Created',
            'text'   => "'$name' has been created successfully"
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

$new_user = function () {
    try {

        $name  = $_REQUEST['name']  ?? '';
        $password = $_REQUEST['password'] ?? '';

        $name = rtrim(ltrim($name));

        if(is_empty($name) || is_empty($password)) {
            return [
                'icon' => 'error',
                'title' => 'Empty Inputs',
                'text' => 'Please check your inputs and try again',
            ];
        }

        $past_users = get_result("select * from users where name = ?", [$name]);
        
        if(count($past_users) > 0) {
            return [
                'icon' => 'error',
                'title' => 'User Exists',
                'text' => "$name already exists in the system",
            ];
        }    

        $password = base64_encode($password . "abdulencryptedkeyalgorithm");
        $image = uniqid($name . "_" . time());
        $image = upload_file('image',  $image, 'image');

        if(is_array($image)) {

            query(" insert into users (name, password, image) values(?,?,?) ", [$name, $password, $image[0]]);
    
            return [
                'icon'  => 'success',
                'title' => 'User Created Successfully',
            ];
        }
        else {
            return [
                'icon' => 'error',
                'title' => 'Image Not Found',
                'text' => 'Please upload an image and try again',
                'return' => [$_POST, $_FILES]
            ];
        }

    } 
    catch (\Exception $e) {
        return [
            'icon' => 'error',
            'title' => 'System Busy',
            'text' => 'System is unable to create a new user at the moment, please try again later'
        ];
    }


};


$login = function () {

    $name = $_REQUEST['name'];
    $password = $_REQUEST['password'];

    $password = base64_encode($password . "abdulencryptedkeyalgorithm");

    $result = get_result("select * from users where name = ? and password = ?", [$name, $password]);

    if(count($result) > 0) {
        return [
            'icon'  => 'success',
            'title' => 'Login Successfull',
        ];
    }

    return [
        'icon' => 'error',
        'title' => 'Invalid Credentials',
        'message' => 'Please check your inputs and try again',
    ];
    
};