<?php
declare(strict_types=1);
$baseURL=$_REQUEST["url"];
require __DIR__."/vendor/autoload.php";
$dotenv = Dotenv\Dotenv::createUnsafeImmutable(__DIR__);
$dotenv-> load();

$partnerName = "applicant";
$partnerPassword = "d7c3119c6cdab02d68d9";

// Getting the request method sent in to the proxy
function getRequestMethod() {
  return $_SERVER["REQUEST_METHOD"]; 
}

// Getting the POST data from a POST request
function getPostData() {
  return http_build_query($_POST);
}

// Bypass CORS to make GET request
function makeGetRequest($baseURL) {
    global $partnerName;
    $ch = curl_init();
    $authToken = $_GET["authToken"];
    $returnValueList = $_GET["returnValueList"];
    $fullURL = $baseURL."&partnerName=".$partnerName."&authToken=".$_GET["authToken"]."&returnValueList=".$_GET["returnValueList"];
    curl_setopt($ch, CURLOPT_URL,$fullURL );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $response = curl_exec($ch);
    if($e = curl_errno($ch)) {
      echo $e;
      curl_close($ch);  
    } else {
      echo $response;
    }
}

// Bypass CORS to make POST request
function makePostRequest($baseURL) {
  $ch = curl_init();
  global $partnerName, $partnerPassword;
  $_POST["partnerName"] = $partnerName;
  $_POST["partnerPassword"] = $partnerPassword;
  $data = http_build_query($_POST);
  curl_setopt($ch, CURLOPT_URL, $baseURL);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $response = curl_exec($ch);
  if($e = curl_errno($ch)) {
    echo $e;
    curl_close($ch);
  }
  else {
    echo $response;
  }
}

$response = "";
switch (getRequestMethod()) {
  case "GET":
    $response = makeGetRequest($baseURL);
    break;
  case "POST":
    $response = makePostRequest($baseURL);
    break;
  default:
    echo "There has been an error";
    return;
}

echo $response;
?>