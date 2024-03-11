<?php
// Retrieve form data
$jsonldData = $_POST['jsonldData'];
$jsonldChecksum = $_POST['jsonldChecksum'];
$jsonldFilename = $_POST['jsonldFilename'];
$checksumFilename = $_POST['checksumFilename'];

// Create a directory to store files
$directory = __DIR__ . "/.well-known/adp";
if (!is_dir($directory)) {
    mkdir($directory, 0755, true);
}

// Save agent.jsonld file
file_put_contents("$directory/$jsonldFilename", $jsonldData);

// Save agent_checksum.txt file
file_put_contents("$directory/$checksumFilename", $jsonldChecksum);

// Display success message
echo "Files generated successfully.";
?>
