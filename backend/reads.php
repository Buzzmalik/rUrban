<?php

$limit = $_REQUEST['limit'] ?? 50;
$page  = $_REQUEST['page'] ?? 1;

$start = clean_time($_REQUEST['start'] ?? "0000-00-00");
$end   = clean_time($_REQUEST['end']   ?? date("Y-m-d H:i:s"));

$sensor_data = function () use($conn, $limit, $page, $start, $end) {

    $sql = "select *, (select count(*) from sensor_data  where Date >= ? and Date <= ? order by Date desc limit ? offset ?) as data_size  from sensor_data where Date >= ? and Date <= ? order by Date desc limit ? offset ?";

    $offset = $limit * ($page - 1);

    return get_result($sql, [$start, $end, $limit, $offset, $start, $end, $limit, $offset]) ?? [];
    
};

$average_sensor_data = function () use($conn, $start, $end) {

    $sql = "select sum(humidity)/count(*)       as humidity, 
                   sum(temperature)/count(*)    as temperature, 
                   sum(soilmoisture)/count(*)   as soilmoisture, 
                   sum(waterlevel)/count(*)     as waterlevel 
            from sensor_data where Date >= ? and Date <= ?";

    return get_result($sql, [$start, $end])[0] ?? [];
    
};

$schedules = function () use($conn, $limit, $page, $start, $end) {
    $sql = "select *, (select count(*) from schedules  where start >= ? and end <= ? order by start desc limit ? offset ?) as data_size  from schedules where start >= ? and end <= ? order by start desc limit ? offset ?";

    $offset = $limit * ($page - 1);

    // echo "select *, (select count(*) from schedules  where start >= '$start' and end <= '$end' order by start desc limit $limit offset $offset) as data_size  from schedules where start >= '$start' and end <= '$end' order by start desc limit $limit offset $offset";
    
    $result = get_result($sql, [$start, $end, $limit, $offset, $start, $end, $limit, $offset]) ?? [];

    return $result;
};

$schedule = function () {
    $id = $_REQUEST['id'];

    return get_result("select * from schedules where id = ?", [$id])[0] ?? [];
};

$users = function() use($start, $end, $page, $limit) {

    $sql = " select *, (select count(*) from users  where created_at >= ? and created_at <= ? and status != 'superadmin' order by created_at desc limit ? offset ?) as data_size  from users where created_at >= ? and created_at <= ? and status != 'superadmin' order by created_at desc limit ? offset ?";
    
    $offset = ($page - 1) * $limit;

    // echo " select *, (select count(*) from users  where created_at >= '$start' and created_at <= '$end' order by created_at desc limit $limit offset $offset) as data_size  from users where created_at >= '$start' and created_at <= '$end' order by created_at desc limit $limit offset $offset";

    return get_result($sql, [$start, $end, $limit, $offset, $start, $end, $limit, $offset]) ?? [];

};




