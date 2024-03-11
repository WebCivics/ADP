<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agent Discovery Protocol Generator</title>
    <!-- Stylesheet -->
    <link rel="stylesheet" href="css/style.css">
    <!-- JavaScript libraries -->
    <script src="js/js-sha256.js"></script>
    <script src="js/script.js"></script>
</head>
<body>
    <h1>Agent Discovery Protocol Generator</h1>

    <form id="dataForm">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>

    <label for="domain">Domain:</label>
    <input type="text" id="domain" name="domain" required>

    <label for="linkedinAccount">LinkedIn Account:</label>
    <input type="text" id="linkedinAccount" name="linkedinAccount">

    <label for="twitterAccount">Twitter Account:</label>
    <input type="text" id="twitterAccount" name="twitterAccount">

    <label for="githubAccount">GitHub Account:</label>
    <input type="text" id="githubAccount" name="githubAccount">

    <label for="SolidwebID">Solid Web ID:</label>
    <input type="text" id="SolidwebID" name="SolidwebID">

    <label for="SoldPodStorage">Solid Pod Storage:</label>
    <input type="text" id="SoldPodStorage" name="SoldPodStorage">

    <label for="cryptoAccounts">Crypto Accounts:</label>
    <input type="text" id="cryptoAccounts" name="cryptoAccounts">

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <!-- Add more fields as needed -->

    <button type="button" onclick="generateJSONLD()">Generate JSON-LD ADP file</button>
</form>

</body>
</html>
