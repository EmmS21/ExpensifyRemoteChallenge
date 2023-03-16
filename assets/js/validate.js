const validationState = new Set();
const loginForm = document.forms[0];
cPrev = -1;

// Toggles validation messages 
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

    return action === "hide" ? addClass()
    : 
    removeClass();
};

// Validation rules for each field in login form.
function validationRules() {
    return {
        email: (inputProps) => {
            const emailValidationRule = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const inputValue = inputProps.value;
            const inputName = inputProps.name;
            const isInputValid = emailValidationRule.test(inputValue);
            isInputValid ? manageState().removeFromState({inputProps, inputName}) 
            : 
            manageState().addToState({inputProps, inputName});
            return true;
        },

        password: (inputProps) => {
            const inputValue = inputProps.value;
            const inputName = inputProps.name;
            const isInputValid = inputValue.length > 3;

            isInputValid ? manageState().removeFromState({inputProps, inputName}) 
            : 
            manageState().addToState({inputProps, inputName});

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
};

// Receives input and checks against validation rules
function validateForm(inputProps) {
    const inputName = inputProps.name;
    const verifyInputName = {
        "emailadd": validationRules().email,
        "password": validationRules().password
    };

    return verifyInputName[inputName](inputProps)
};

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
};

// Retrieve all transactions from API
async function getTransactions(token) {
    await jQuery.ajax({
        type: "GET",
        url: "proxy.php?url=https://www.expensify.com/api?command=Get",
        data: {
                authToken: token, 
                returnValueList: "transactionList"
            },
        success: function (response) {
            const res = JSON.parse(response)["transactionList"]
            for(var i = 0; i < res?.length; i++) {
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
            document.getElementById("login-footer").style.display = "none";
            document.getElementById("auth-buttons").style.display = "flex";
        }
    })    
};

// Sort table by column 
function sortBy(c){
    rows = document.getElementById("table-sort").rows.length;
    cols = document.getElementById("table-sort").rows[0].cells.length;
    // pointer-header one
    arrTable = [...Array(rows)].map(e => Array(cols));
    for(let rw = 0; rw < rows; rw++){
        for(let cl = 0; cl < cols; cl++){
            arrTable[rw][cl] = document.getElementById("table-sort").rows[rw].cells[cl].innerHTML;
        }
    }
    th = arrTable.shift();
    if (c!== cPrev){
        if(c === 0) {
            document.getElementById("pointer-one").title = "  ↑"
        } else if (c === 1) {
            document.getElementById("pointer-two").title = "  ↑"
        } else if (c === 2) {
            document.getElementById("pointer-three").title = "  ↑"
        }
        arrTable.sort(
            function (a,b){
                if(a[c] === b[c]){
                    return 0;
                } else {
                    return (a[c] < b[c]) ? -1: 1;
                }
            }
        )
    } else {
        if(c === 0) {
            document.getElementById("pointer-one").title = "  ↓"
        } else if (c === 1) {
            document.getElementById("pointer-two").title = "  ↓"
        } else if (c === 2) {
            document.getElementById("pointer-three").title = "  ↓"
        } 
        arrTable.reverse();
    }
    cPrev = c;
    arrTable.unshift(th);
    for(let rw=0; rw < rows; rw++){
        for(let cl=0; cl < cols; cl++){
            document.getElementById("table-sort").rows[rw].cells[cl].innerHTML = arrTable[rw][cl];
        }
    }
};

// Search for data in table
function searchTable() {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-sort");
    tr = table.getElementsByTagName("tr");
    for (let i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (let j = 1; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
}

// Logout and remove authToken from SessionStorage
function logout() {
    sessionStorage.removeItem("authToken");
    document.getElementById("login-container").style.display = "flex";
    document.getElementById("login-footer").style.display = "block";
    document.getElementById("tablecontainer").style.display = "none";
    document.getElementById("auth-buttons").style.display = "none";
    document.getElementById("footer-text").style.display = "block";
};

// Creating cookie with name authToken and token as value
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    sessionStorage.setItem(name,value);
};

// When page loads check if there is a cookie in sessionStorage to verify if user is authenticated
function pageLoad () {
    const token = sessionStorage.getItem("authToken");
    if(token) {
        getTransactions(token);
        document.getElementById("footer-text").style.display = "none";
    }
};

// Create a new transaction
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
        jQuery.ajax({
            type: "POST",
            url: "proxy.php?url=https://www.expensify.com/api?command=CreateTransaction",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            data: data,
            success: function (response) {
                console.log('resp', response)
                document.getElementById("create-container").style.display = "none";
                document.getElementById("tablecontainer").style.display = "block";
                clearForm();
            }
        })
    })
};

// Close create transaction form
function hideCreate() {
    document.getElementById("create-container").style.display = "none";
    document.getElementById("tablecontainer").style.display = "block";
    clearForm();
};

// Disable create transaction button if any fields are empty
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
};

// Clear all values in input fields for create transactions form when create transaction for is closed
function clearForm() {
    document.getElementById("created").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("merchant").value = "";
};

// Unhide form to create transaction
function openCreate() {
    document.getElementById("create-container").style.display = "block";
    document.getElementById("tablecontainer").style.display = "none";
};

// Handling login process
function submitForm() {
    const submitButton = document.getElementsByClassName("login")[0];
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        const emailAddress = document.getElementById("email-add").value
        const password = document.getElementById("password-add").value       
        manageState().validateState();
        data = {
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
                if(response["httpCode"] === 200) {
                    setCookie("authToken", response["authToken"],1)
                    document.getElementById("login-container").style.display = "none";
                    document.getElementById("login-footer").style.display = "none";
                    document.getElementById("spin").style.display = "block";
                    document.getElementById("auth-buttons").style.display = "flex";
                    document.getElementById("create-container").style.display = "none";
                    document.getElementById("footer-text").style.display = "none";
                    getTransactions(response["authToken"]);
                }
                else if(response["jsonCode"] === 401) {
                    document.getElementById("auth-error").style.display = "block";
                    document.getElementById("auth-error").innerText = response["message"];
                }
                else if(response["jsonCode"] === 402) {
                    document.getElementById("auth-error").style.display = "block";
                    document.getElementById("auth-error").innerText = response["message"];
                } 
                else if(response["jsonCode"] === 404) {
                    document.getElementById("auth-error").style.display = "block";
                    document.getElementById("auth-error").innerText = response["message"]
                }
            },  
            error: function (response) {
                console.log("error", response);
            },
            complete: function(response) {
                response.then((resp)=>{
                    console.log('complete', resp)
                })
            }
        })
    })
};

function init() {
    attachKeyUpEvent();
    submitForm();
    createTransaction();
};

document.addEventListener("DOMContentLoaded", init);

