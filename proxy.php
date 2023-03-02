<?php
$baseURL=$_REQUEST["url"];
$partnerName="applicant";
$partnerPassword="d7c3119c6cdab02d68d9";

// Getting the request method sent in to the proxy
function getRequestMethod() {
  return $_SERVER["REQUEST_METHOD"]; 
}

// Getting the POST data from a POST request
function getPostData() {
  return http_build_query($_POST);
}

// Bypass CORS to make GET request
function makeGetRequest($baseURL, $partnerName) {
    $ch = curl_init();
    $partnerName = $partnerName;
    $authToken = $_GET["authToken"];
    $returnValueList = $_GET["returnValueList"];
    $fullURL = $baseURL."&partnerName=".$partnerName."&authToken=".$_GET["authToken"]."&returnValueList=".$_GET["returnValueList"];
    curl_setopt($ch, CURLOPT_URL,$fullURL );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $response = curl_exec($ch);
    curl_close($ch);  
    if($e = curl_error($ch)) {
        echo $e;
    } else {
      echo $response;
    }
}

// Bypass CORS to make POST request
function makePostRequest($baseURL, $partnerName, $partnerPassword) {
  $ch = curl_init();
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
  curl_close($ch);
  if($e = curl_error($ch)) {
    echo $e;
  }
  else {
    echo $response;
  }
}

$response = "";
switch (getRequestMethod()) {
  case "GET":
    $response = makeGetRequest($baseURL, $partnerName);
    break;
  case "POST":
    $response = makePostRequest($baseURL, $partnerName, $partnerPassword);
    break;
  default:
    echo "There has been an error";
    return;
}

echo $response;
?>