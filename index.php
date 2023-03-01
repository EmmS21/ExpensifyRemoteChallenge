<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Expensify Build</title>
    <link rel="shortcut icon" type="image/x-icon" href="assets/images/logo.png" />
    <link rel="stylesheet" href="assets/css/index.css" />
    <link rel="stylesheet" href="assets/css/table.css" />
    <link rel="stylesheet" href="assets/css/login.css" />
    <link rel="stylesheet" href="assets/css/createtransact.css" />
    <link href='https://fonts.googleapis.com/css?family=Nunito:400,300' rel='stylesheet' type='text/css'>
    <script src="https://www.kryogenix.org/code/browser/sorttable/sorttable.js"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script> -->
    <script defer src="assets/js/validate.js"></script>
</head>
<body onload="pageLoad()">
    <nav class="navbar">
        <img class="brand-title" src="assets/images/expensify.png" alt="Expensify: Easy Money">
        <div id="auth-buttons">
          <button class="brand-title button" onClick="create()">Create Transaction</button>
          <button class="brand-title button cancel-btn" onClick="logout()">Logout</button>
        </div>
    </nav>
    <div id="loginContent">
        <!-- Add your login form here -->
    </div>
    <div id="spin" class="spinner"></div>
    <?php
      require_once('login.php');
      require_once('table.php');
      require_once('createtransact.php');
    ?>
    <!-- Javascript Files, we've included JQuery here, feel free to use at your discretion. Add whatever else you may need here too. -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <!-- <script type="text/javascript" src="script.js"></script> -->

</body>
</html>