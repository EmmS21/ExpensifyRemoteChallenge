const validationState = new Set();
const loginForm = document.forms[0];

// Function manipulates validation messages by toggling them
function manipulateValidationMsg(validationData) {
    const { inputProps, action } = validationData;
    const elementValidationMsg = inputProps.nextElementSibling;
    const validationMsgClasses = elementValidationMsg.classList;
    const removeClass = () => {
        validationMsgClasses.remove("hide");
    };

    const addClass = () => {
        validationMsgClasses.add("hide");
    };

    return action === "hide" ? addClass() : removeClass();
}


// Validation rules for each field in our form.
function validationRules() {
    return {
        email: (inputProps) => {
            const emailValidationRule = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const inputValue = inputProps.value;
            const inputName = inputProps.name;
            const isInputValid = emailValidationRule.test(inputValue);
            isInputValid ? manageState().removeFromState({inputProps, inputName}) : manageState().addToState({inputProps, inputName});
            return true;
        },

        password: (inputProps) => {
            const inputValue = inputProps.value;
            const inputName = inputProps.name;
            const isInputValid = inputValue.length > 3;

            isInputValid ? manageState().removeFromState({inputProps, inputName}) : manageState().addToState({inputProps, inputName});

            return true;
        },

        emptyFields: () => {
            const formInputElems = [...loginForm.elements].filter(item => item.nodeName === "INPUT");
            for(const inputProps of formInputElems) {
                const inputName = inputProps.name;
                const inputValue = inputProps.value;

                if(!inputValue) {
                    manageState().addToState({inputProps, inputName});
                } 
            }
        }
    }
}

// Function receives an input with its properties
function validateForm(inputProps) {
    // console.log("validateForm");
    const inputName = inputProps.name;
    const verifyInputName = {
        "emailadd": validationRules().email,
        "password": validationRules().password
    };

    return verifyInputName[inputName](inputProps)
}

// Collection of functions for managing state
function manageState() {
    return {
        addToState: (inputData) => {
            const { inputProps, inputName } = inputData;

            validationState.add(inputName);
            manipulateValidationMsg({ inputProps });
        },
        removeFromState: (inputData) => {
            const action = "hide";
            const { inputProps, inputName } = inputData;

            validationState.delete(inputName);
            manipulateValidationMsg({ inputProps, action})
        },
        validateState: () => {
            if(validationState.size > 0) {
                return false;
            }

            if(validationState.size === 0) {
                validationRules().emptyFields();
                return true;
            }
        }
    }
};


// Attaching 'keyup' event to the login form. 
// Using event delegation
function attachKeyUpEvent() {
    loginForm.addEventListener("keyup", function(event) {
        const nodeName = event.target.nodeName;
        const inputProps = event.target;

        if(nodeName === "INPUT") {
            validateForm(inputProps);
        }
    });
}


function getReq(token){
    jQuery.ajax({
        type: "GET",
        url: "proxy.php?url=https://www.expensify.com/api?command=Get",
        data: {partnerName: "applicant", authToken: token, returnValueList: "transactionList"},
        success: function (response){
            const res = JSON.parse(response)["transactionList"]
            for(var i = 0; i < res.length; i++){
                var row = $(
                    "<tr><td>"
                    + res[i].inserted
                    + "</td><td>"
                    + res[i].merchant
                    +"</td><td>"
                    + res[i].amount/100
                    +"</td><td>"
                    + res[i].currency
                    +"</td></tr>"
                    );
                $('#tBody').append(row);
            }
            document.getElementById("tablecontainer").style.display = "block";
            document.getElementById("spin").style.display = "none";
            document.getElementById("login-container").style.display = "none";
            document.getElementById("auth-buttons").style.display = "flex";
        }
    })    
}

//logout and remove authToken from localStorage
function logout() {
    sessionStorage.removeItem("authToken");
    document.getElementById("login-container").style.display = "flex";
    document.getElementById("tablecontainer").style.display = "none";
    document.getElementById("auth-buttons").style.display = "none";

}
//creating cookie with name authToken and token as value
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    console.log("SET TOKEN:",name, value);
    sessionStorage.setItem(name,value);
}

//when page loads check if there is a cookie in local storage to verify if user is authenticated
function pageLoad() {
    const token = sessionStorage.getItem("authToken");
    if(token) {
        getReq(token);
    }
}

function createTransaction() {
    const token = sessionStorage.getItem("authToken");
    const createTransactButton = document.getElementsByClassName("create-button")[0];
    createTransactButton.addEventListener("click", function(event) {
        event.preventDefault();
        const created = document.getElementById("created").value;
        const amount = document.getElementById("amount").value;
        const merchant = document.getElementById("merchant").value;
        data = {
            authToken: token,
            created: created,
            amount: amount,
            merchant: merchant
        },
        console.log('data', data);
        jQuery.ajax({
            type: "POST",
            url: "proxy.php?url=https://www.expensify.com/api?command=CreateTransaction",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            data: data,
            success: function (response){
                document.getElementById("spin").style.display = "block";
                document.getElementById("create-container").style.display = "none";
                getReq(data['authToken']);
                tempAlert(`New transaction created by merchant: ${data["merchant"]}`,8000);
            }
        })
    })
}

//close create transaction form
function hideCreate() {
    document.getElementById("create-container").style.display = "none";
    document.getElementById("tablecontainer").style.display = "block";
}

//disable create transaction button if any fields are empty
function btnActivation() {
    if (
      !document.getElementById("created").value.length ||
      !document.getElementById("merchant").value.length ||
      !document.getElementById("amount").value.length
    ) {
      document.getElementById("create-transaction").disabled = true;
    } else {
      document.getElementById("create-transaction").disabled = false;
    }
  }

//clear all values in input fields for create transactions form
function clearForm() {
    document.getElementById("created").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("merchant").value = "";
}

//unhide form to create transaction
function openCreate() {
    document.getElementById("create-container").style.display = "block";
    document.getElementById("tablecontainer").style.display = "none";
}

function submitForm() {
    var script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.6.3.min.js"; 
    document.getElementsByTagName('head')[0].appendChild(script);
    const submitButton = document.getElementsByClassName("login")[0];
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        const inputs = document.getElementsByTagName("input")
        const emailAddress = inputs[0].value
        const password = inputs[1].value        
        manageState().validateState();
        data = {
            partnerName:"applicant",
            partnerPassword: "d7c3119c6cdab02d68d9",
            partnerUserID: emailAddress,
            partnerUserSecret: password
        },
        jQuery.ajax({
            type: "POST",
            url: "proxy.php?url=https://www.expensify.com/api?command=Authenticate",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            data: data,
            success: function (response){
                if(response["httpCode"] === 200){
                    console.log("resp", response["authToken"]);
                    setCookie("authToken", response["authToken"],1)
                    document.getElementById("login-container").style.display = "none";
                    document.getElementById("spin").style.display = "block";
                    document.getElementById("auth-buttons").style.display = "flex";
                    document.getElementById("create-container").style.display = "none";
                    getReq(response["authToken"]);
                }
                else if(response["jsonCode"] === 401){
                    document.getElementById("auth-error").style.display = "block";
                    document.getElementById("auth-error").innerText = response["message"];
                } else if(response['jsonCode'] === 404){
                    document.getElementById("auth-error").style.display = "block";
                    document.getElementById("auth-error").innerText = response["message"]
                }
            },  
            error: function (response){
                console.log("error", response);
            },
            complete: function(response){
                response.then((resp)=>{
                    // console.log('complete', resp)
                })
            }
        });
    });
}

//create disappearing alert when successful transaction has been created
function tempAlert(msg, duration) {
    document.getElementById("new-transact").style.display = "block";
    document.getElementById("new-transact").innerText =  msg;
    setTimeout(function(){
        document.getElementById("new-transact").style.display = "none";
    },duration);
}


function init() {
    attachKeyUpEvent();
    submitForm();
    createTransaction();
}

document.addEventListener("DOMContentLoaded", init);

