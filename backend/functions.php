<?php

function clean_time($value) {
    $value = str_replace("T", " ", $value);
    $value = str_replace("Z", "", $value);

    return $value;
}

function query($sql, $parameters=[]) {

    global $conn;

    $sql = $conn->prepare($sql);

    if(count($parameters) > 0)
    $sql->bind_param(str_repeat('s', count($parameters)), ...$parameters);

    if($sql->execute()) {
        return true;
    }

    return false;
}

function is_empty($value) {
    $value = str_replace(" ", "", $value);

    return empty($value);
}

function get_result($sql, $parameters=[]) {

    global $conn;

    $sql = $conn->prepare($sql);

    if(count($parameters) > 0)
    $sql->bind_param(str_repeat('s', count($parameters)), ...$parameters);

    $sql->execute();

    $result = $sql->get_result();

    $result = mysqli_fetch_all($result, MYSQLI_ASSOC);

    return $result;
}

function upload_file($target, $name, $type)
{
    if (!isset($_FILES[$target])) {
        return "$target not found";
    }

    $destination = $_SERVER['DOCUMENT_ROOT'].'/rurban/backend/uploads/';
    // Define allowed file types based on your requirements
    $allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
    $allowedDocumentTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain',
        'text/xml', 'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif', 'video/mp4', 'video/mp3', 'video/webm',
    ];
    $allowedVideoTypes = ['video/mp4', 'video/mp3', 'video/webm'];

    // Define maximum file sizes for each type (in bytes)
    $maxImageSize = 10 * 1024 * 1024; // 10 MB
    $maxDocumentSize = 20 * 1024 * 1024; // 20 MB
    $maxVideoSize = 100 * 1024 * 1024; // 100 MB

    // Check if the uploaded file is of the allowed type
    $allowedTypes = [];
    $maxSize = 0;
    switch ($type) {
        case 'image':
            $allowedTypes = $allowedImageTypes;
            $maxSize = $maxImageSize;
            $destination .= 'images/';
            break;
        case 'document':
            $allowedTypes = $allowedDocumentTypes;
            $maxSize = $maxDocumentSize;
            $destination .= 'documents/';
            break;
        case 'video':
            $allowedTypes = $allowedVideoTypes;
            $maxSize = $maxVideoSize;
            $destination .= 'videos/';
            break;
        default:
            return 'Invalid file type';
    }

    if (!in_array($_FILES[$target]['type'], $allowedTypes)) {
        return 'File type not allowed';
    }

    // Check for file size
    if ($_FILES[$target]['size'] > $maxSize) {
        return 'File size exceeded';
    }

    // Check for any errors during file upload
    if ($_FILES[$target]['error'] !== UPLOAD_ERR_OK) {
        return 'File upload error';
    }

    // Create a safe filename
    $safeFilename = preg_replace('/[^a-zA-Z0-9_\-]/', '', $name);
    $extension = pathinfo($_FILES[$target]['name'], PATHINFO_EXTENSION);
    $finalFilename = $safeFilename.'.'.$extension;

    // Move the uploaded file to the desired destination
    $uploadPath = $destination.'/'.$finalFilename;
    if (move_uploaded_file($_FILES[$target]['tmp_name'], $uploadPath)) {
        return [$finalFilename, 'File uploaded successfully'];
    } else {
        return 'File upload failed';
    }
}