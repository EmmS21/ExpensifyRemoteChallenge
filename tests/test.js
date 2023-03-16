// Start with an iffe and expose the public variable on global
(function () {
    // "it" function defines the test case
    function it(desc, func) {
      //encapsulate the func call in try/catch block so that testing does not stop if one test fails
      try {
        func();
        // If the test case passes then log the test case description in the browser console with a checkmark
        console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
      } catch (error) {
        // log the error on the console with an 'x'
        console.log('\n');
        console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
        console.error(error);
        console.log('\n');
      }
    };
  
    function assert(isTrue) {
      if (!isTrue) {
        throw new Error();
      }
    };

    it("Login form loads with email, password inputs and login button", function () {
        var inputs = document.querySelector("#login-form");
        var button = document.getElementById("login-button");
        var email = inputs[0];
        var password = inputs[1];
        assert(email && 
                password && 
                button);
    });
    
    it("Sidebar footer links lead to correct endpoints", function () {
        var footerLinks = document.getElementsByTagName("a");
        var terms = footerLinks[0];
        var privacy = footerLinks[1];
        assert(terms.href === "https://use.expensify.com/terms" && 
                privacy.href === "https://use.expensify.com/privacy");
    });

    it("Errors remain hidden before user inputs any text in input tabs and displays correct text", function () {
        var clientSideErrors = document.getElementsByClassName("span-text hide");
        var emailError = clientSideErrors[0]
        var passwordError = clientSideErrors[1]
        assert(emailError.style.display === "" &&
                passwordError.style.display === "" &&
                emailError.innerHTML === "Please enter a valid email address" &&
                passwordError.innerHTML === "Password must be at least 3 characters"
        )
    });

    it("Server side errors hidden before user submits login form and innerHTML text is blank initially", function () {
        var serverSide = document.getElementById("auth-error");
        assert(serverSide.style.display === "" &&
            serverSide.innerHTML === ""
        )
    });
  })();