<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <script defer src="assets/js/validate.js"></script>
        <title>Login</title>
        <link rel="shortcut icon" type="image/x-icon" href="assets/images/logo.png" />
        <link rel="stylesheet" href="assets/css/login.css" /> 
    </head>
    <body>
        <div id="container">
            <img class="brand-title" src="assets/images/expensify.png" alt="Italian Trulli">
            <h2>Login</h2>
            <form method="POST">
                <div class="input-div">
                    <input class="inputtab" type="text" name="emailadd" placeholder="Email address">
                    <span class="span-text hide">Please enter a valid email address</span>
                    <div class="border1"></div>
                    <input class="inputtab" type="password" name="password" placeholder="Password">
                    <span class="span-text hide">Password must be atleast 3 characters</span>
                    <div class="border2"></div>
                    <p><input type="checkbox" name="remember" class="reminput"/>Remember me</p>
                    <button class="login">Sign in </button>
                </div>
            </form>
        </div>
    </body>
</html>