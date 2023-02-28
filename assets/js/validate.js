const validationState = new Set();
const loginForm = document.forms[0];

// Function manipulates validation messages by toggling them
function manipulateValidationMsg(validationData) {
    const { inputProps, action } = validationData;
    const elementValidationMsg = inputProps.nextElementSibling;
    const validationMsgClasses = elementValidationMsg.classList;
    const removeClass = () => {
        validationMsgClasses.remove('hide');
    };

    const addClass = () => {
        validationMsgClasses.add('hide');
    };

    return action === 'hide' ? addClass() : removeClass();
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
            const formInputElems = [...loginForm.elements].filter(item => item.nodeName === 'INPUT');
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
        'emailadd': validationRules().email,
        'password': validationRules().password
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
            const action = 'hide';
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
    loginForm.addEventListener('keyup', function(event) {
        const nodeName = event.target.nodeName;
        const inputProps = event.target;

        if(nodeName === 'INPUT') {
            validateForm(inputProps);
        }
    });
}


function getReq(token){
    jQuery.ajax({
        type: "GET",
        url: "proxy.php?url=https://www.expensify.com/api?command=Get",
        data: {partnerName: 'applicant', authToken: token, returnValueList: 'transactionList'},
        success: function (response){
            console.log(JSON.parse(response)['transactionList'])
            const res = JSON.parse(response)['transactionList']
            for(var i = 0; i < res.length; i++){
                // console.log('res', res[i]);
                var row = $(
                    '<tr><td>'
                    + res[i].inserted
                    + '</td><td>'
                    + res[i].merchant
                    +'</td><td>'
                    + res[i].amount
                    +'</td><td>'
                    + res[i].currency
                    +'</td></tr>'
                    );
                $('#tBody').append(row);
            }
            document.getElementById("tablecontainer").style.display = "block";
            document.getElementById("spin").style.display = "none";
            document.getElementById("login-container").style.display = "none";
        }
    })    
}

function logout() {
    sessionStorage.removeItem('authToken');
    document.getElementById("login-container").style.display = "block";
    document.getElementById("tablecontainer").style.display = "none";

}

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
function pageLoad()
{
    const token = sessionStorage.getItem("authToken");
    console.log("Token:", token);   
    if(token)
    {
        getReq(token);
    }
}

function createTransaction() {
    const token = sessionStorage.getItem("authToken");
    const createTransactButton = document.getElementsByClassName('create')[0];
    createTransactButton.addEventListener('click', function(event) {
        event.preventDefault();
        const inputs = document.getElementsByTagName('input');
        const created = inputs[0].value;
        const amount = inputs[1].value;
        const merchant = inputs[2].value;
        data = {
            created: created,
            amount: amount,
            merchant: merchant
        },
        jQuery.ajax({
            type: "POST",
            url: "proxy.php?url=https://www.expensify.com/api?command=CreateTransaction",
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded',
            data: data,
            success: function (response){
                console.log('created', response);
            }
        })
    })
}

//unhide form to create transaction
function create() {
    document.getElementById("create-container").style.display = "block";
    document.getElementById("tablecontainer").style.display = "none";
}

function submitForm() {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
    document.getElementsByTagName('head')[0].appendChild(script);
    const submitButton = document.getElementsByClassName('login')[0];
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        const inputs = document.getElementsByTagName('input')
        const emailAddress = inputs[0].value
        const password = inputs[1].value        
        manageState().validateState();
        data = {
            partnerName:'applicant',
            partnerPassword: 'd7c3119c6cdab02d68d9',
            partnerUserID: emailAddress,
            partnerUserSecret: password
        },
        // console.log('data',data)
        jQuery.ajax({
            type: "POST",
            url: "proxy.php?url=https://www.expensify.com/api?command=Authenticate",
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded',
            data: data,
            success: function (response){
                console.log('resp', response['authToken']);
                setCookie('authToken', response['authToken'],1)
                document.getElementById("login-container").style.display = "none";
                document.getElementById("spin").style.display = "block";
                document.getElementById("auth-buttons").style.display = "flex";
                getReq(response['authToken']);
            },  
            error: function (response){
                console.log('error', response);
            },
            complete: function(response){
                response.then((resp)=>{
                    // console.log('complete', resp)
                })
            }
        });
    });
}

function init() {
    attachKeyUpEvent();
    submitForm("proxy.php");
}

document.addEventListener('DOMContentLoaded', init);

