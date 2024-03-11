<?php
// Get the target URL from the query string
$targetUrl = $_GET['url'];

// Check if the URL is provided
if (empty($targetUrl)) {
    header('HTTP/1.1 400 Bad Request');
    echo 'Missing target URL parameter';
    exit();
}

// Set headers to allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: *');

// Forward the request to the target URL
$ch = curl_init($targetUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    header('HTTP/1.1 500 Internal Server Error');
    echo 'Error communicating with the target server';
    exit();
}

// Get information about the last transfer
$info = curl_getinfo($ch);

// Set the original response headers
foreach (getallheaders() as $name => $value) {
    if (strpos($name, 'Origin') === 0) {
        header($name . ': ' . $value);
    }
}

// Set the original response status code
http_response_code($info['http_code']);

// Forward the original response headers
foreach (explode("\r\n", $info['header_out']) as $header) {
    if (!empty($header)) {
        header($header);
    }
}

// Output the response content
echo $response;

// Close cURL resource
curl_close($ch);
?>
