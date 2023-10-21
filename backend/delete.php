<?php

$delete_schedule = function () {
    
    $id        = $_REQUEST['id']  ?? '';

    if(is_empty($id))
    {
        return [
            'icon' => 'error',
            'title'  => 'System Error',
            'text'   => 'Please refresh your page and try again.'
        ];
    }


    if(query("delete from schedules where id = ? ", [$id]))
    { 
        return [
            'icon' => 'info',
            'title'  => 'Schedule Deleted',
            'text'   => "Schedule has been deleted successfully"
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

$delete_user = function () {
    
    $id        = $_REQUEST['id']  ?? '';

    if(is_empty($id))
    {
        return [
            'icon' => 'error',
            'title'  => 'System Error',
            'text'   => 'Please refresh your page and try again.'
        ];
    }


    if(query("delete from users where id = ? ", [$id]))
    { 
        return [
            'icon' => 'info',
            'title'  => 'User Deleted',
            'text'   => "User has been deleted successfully"
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