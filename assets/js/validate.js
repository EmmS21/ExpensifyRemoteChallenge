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
// function attachKeyUpEvent() {
//     loginForm.addEventListener('keyup', function(event) {
//         const nodeName = event.target.nodeName;
//         const inputProps = event.target;

//         if(nodeName === 'INPUT') {
//             validateForm(inputProps);
//         }
//     });
// }
// function getReq(token){
//     console.log('get Req triggered in JS')
//     jQuery.ajax({
//         type: "GET",
//         url: "proxy.php?url=https://www.expensify.com/api?command=Get",
//         dataType: "json",
//         contentType: "application/x-www-form-urlencoded",
//         data: token,
//         success: function (data){
//             console.log('get success', data)
//         }
//     })
// }

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
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
        console.log('data',data)
        jQuery.ajax({
            type: "POST",
            url: "proxy.php?url=https://www.expensify.com/api?command=Authenticate",
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded',
            data: data,
            success: function (response){
                console.log('resp', response);
                // setCookie('authToken', resp['authToken'],1)
                // console.log(resp['authToken'])
                // window.location.href="http://127.0.0.1:5000/index.php";
                // getReq(resp['authToken']);
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
    // attachKeyUpEvent();
    submitForm("proxy.php");
}

document.addEventListener('DOMContentLoaded', init);

