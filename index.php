<?php
  session_start();
  if(!isset($_COOKIE['authToken'])){
    header ("location: /login.php");
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Expensify Build</title>
    <link rel="shortcut icon" type="image/x-icon" href="assets/images/logo.png" />
    <link rel="stylesheet" href="assets/css/index.css" />
    <link rel="stylesheet" href="assets/css/table.css" />
    <!-- <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script> -->
    <script defer src="assets/js/validate.js"></script>
</head>
<body>
    <nav class="navbar">
        <img class="brand-title" src="assets/images/expensify.png" alt="Italian Trulli">
        <div class="brand-title">Expensify: Easy Money</div>
        <div class="brand-title">Logout</div>
    </nav>
    <div id="loginContent">
        <!-- Add your login form here -->
    </div>
    <div class="container">
        <h1>Transactions:</h1>
          <table class="rwd-table">
            <tbody>
              <tr>
                <th>Transaction Date</th>
                <th>Merchant</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td data-th="Transaction Date">
                  UPS5005
                </td>
                <td data-th="Merchant">
                  UPS
                </td>
                <td data-th="Amount">
                  ASDF19218
                </td>
              </tr>
              <tr>
                <td data-th="Transaction Date">
                  UPS3449
                </td>
                <td data-th="Merchant">
                  UPS South Inc.
                </td>
                <td data-th="Amount">
                  ASDF29301
                </td>
              </tr>
            </tbody>
          </table>
    </div>
    <div id="transactionForm">
        <!-- Add your create transaction form here -->
    </div>
    <!-- Javascript Files, we've included JQuery here, feel free to use at your discretion. Add whatever else you may need here too. -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script type="text/javascript" src="script.js"></script>

</body>
</html>