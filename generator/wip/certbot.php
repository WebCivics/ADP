<?php
// Configuration - Replace with your actual values
$filename = "filename.ttl"; 
$domain = "yourdomain.com";  

// *** SECURITY: Protect this script and the generated files ***

// 1. Get IP Address associated with the TTL filename
$ip = gethostbyname($filename);  

// Handle potential errors if DNS lookup fails

// 2. Calculate Checksum of the TTL file
$checksum = hash_file('sha256', $filename); // Or your preferred checksum algorithm

// 3. Create OpenSSL Configuration Segment 
$opensslConfig = "
[ v3_req ]
subjectAltName = @alt_names

[ alt_names ]
IP.1 = $ip
URI.1 = http://$domain/$filename
otherName.1 = 1.3.6.1.4;FORMAT:HEX,OCT:$checksum 
";

// 4. Store config in a temporary file 
$tmpConfigFile = tempnam(sys_get_temp_dir(), 'certconfig');
file_put_contents($tmpConfigFile, $opensslConfig);

// 5. Construct Certbot Command (using pre-hook example)
$certbotCommand = "certbot certonly --webroot -w /var/www/html -d $domain 
                   --pre-hook 'openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -subj \"/CN=$domain\" -config $tmpConfigFile' 
                   ";

// 6. Execute Certbot Command
$output = shell_exec($certbotCommand);
echo "<pre>$output</pre>";

// 7. Important Cleanup: Securely delete the temporary config file 
unlink($tmpConfigFile);

?>
