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
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    <script src="https://www.kryogenix.org/code/browser/sorttable/sorttable.js"></script>
    
    <!-- <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script> -->
    <script defer src="assets/js/validate.js"></script>
</head>
<body onload="pageLoad()">
    <nav class="sidebar">
      <div class="container-div">
        <img class="nav-img" src="assets/images/expensify.png" alt="Expensify: Easy Money">
        <p>The People's Choice - Ditch  the Spreadsheet</p>
        <div id="auth-buttons">
          <button class="button-test" onClick="openCreate()">Create Transaction</button>
          <button class="button-test" onClick="logout()">Logout</button>
        </div>
      </div>
      <footer class="footer">
        <h4>Expensify</h4>
        <p>By logging in, you agree to our <a href="https://use.expensify.com/terms">terms of service</a> and <a href="https://use.expensify.com/privacy">privacy policy</a>.</p>
      </footer>
    </nav>
    <div id="loginContent">
        <!-- Add your login form here -->
    </div>
    <div id="spin" class="spinner"></div>
    <?php
      require_once('login.php');
      require_once('table.php');
      require_once('createtransact.php');
      require_once('logoutConfirmationModal.php');
    ?>
    <!-- Javascript Files, we've included JQuery here, feel free to use at your discretion. Add whatever else you may need here too. -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <!-- <script type="text/javascript" src="script.js"></script> -->

</body>
</html>