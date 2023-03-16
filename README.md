# Expensify Remote Challenge

## Task Breakdown and challenges encountered

### Creating login form

I started off by creating a separate `login.php`. I decided to create a file for each major component I would need for this task, specifically; the table, login and create transaction form. This would make it easier to track down any errors I encountered. I approximate that creating this html code along with the relevant css took 2 hours. A lot of the time here was spent on styling the login form to ensure the color scheme matched the colors I saw on the Expensify landing page and to make the login form look presentable and responsive.

### Creating the table

I estimate that creating the table took about 2 hours. This excludes any Javascript code written to populate the table with data. A bulk of the time went towards styling the table. Another challenge here was deciding which fields to show. I made a `POST` request to get an authToken and made a `GET` request on Postman to get an idea of what data I would be expected to show on the table. I decided to show the fields; Inserted, Merchant, Amount and Currency. 

I renamed Inserted as Transaction Date. I assumed Inserted referred to the date the transaction was made and inserted, hence renaming it to Transaction Date. 

I put myself in the shoes of a hypothetical end user, using this to track transactions made through a company credit card. It would be important to know when the transaction was made, the amount, the merchant - to get an idea of the likely reason this transaction was made and the currency, taking into consideration that a company with employers operating or travelling to other countries may transact in other currencies.


### Creating the form enabling users to create a new transaction

I estimate the time it took to create the form and carry out the necessary styling took about an hour or two.

## The Logic

### Login Logic

I estimate that creating the Login logic took about 3 and a half days. This was the first function I created, I learned PHP from sratch to understand how to go about building a PHP proxy. Creating this PHP proxy was the biggest hurdle. I initially started off with a login process that would redirect the user from the login form to the index page. I worried that this went against the instruction of building a single page application. After some deliberation, I decided to toggle css properties to hide and show components based on whether the user was authenticated or not.

While I understand that I could have written functions to revoke a cookie when a user logs out and potentially have another function checking whether or not there is a valid cookie, getting the authToken from the cookie and calling the function to populate the table with transaction data, I opted to create a cookie with the key `authToken` and the value containing the token and, within the same function, set a key value pair in sessionStorage to match the key and values of my cookie. 

I asked myself the question; what is the simplest way to check whether a user is authenticated, revoke access when they log out, my option seemed to best answer this question, purely based on simplicity. Additionally, session storage is easy to access. Additionally, since I was dealing with transaction data, it would make sense to limit the lifetime of authentication to the point where the user closes the tab as opposed to relying on revoking a cookie or relying on the cookie's expiration date.

I handled errors thrown by the `Authenticate` endpoint within the login logic, toggling css to hide and show error warnings relevant to the error received as a response.

One concern I struggled with for some time was whether to sanitize input data before making a `POST` request. Upon further research I realized since I was sending this data to a 3rd party, it was not my responsibility to sanitize the data, primarily because I didn't have any context regarding whether the data would be in either an HTML or SQL context. If I were to prematurely HTML-encode the data for example, if it wasn't going to an HTML document, I would run the risk of corrupting it.

### Retrieving transactions

I estimate that this task took about 4-5 hours. At this point, I spent a little more time setting up a spinner to enrich the user experience. I believe having a spinner while awaiting a response/ particular function to run, makes the site seem less glitchy to users. The biggest challenge was figuring out how to best iterate through the JSON data received. A little research helped alleviate this issue.

### Logging the user out

I estimate this task took 20 minutes to an hour. Since I was checking sessionStorage to see if the user was authenticated, logging the user out simply involves removing the key `authToken` and its value from sessionStorage.

### Client Side Validation

I estimate this task took 2-3 hours. I wanted to check whether or not the user entered an email that appeared valid, based on its structure and a password with atleast 3 characters. I Googled a few solutions to help build this function, taking time to break down each solution I found to better understand how it worked before deciding on what to use.

I believe showing users an error message to indicate that they have entered an invalid email or a password that is too short, even though this is a login form, would make for a more intuitive user experience. ie. in the event that a user mistakenly types an email that is structurally invalid, they would see an error indicating this without having to login.

### Creating a new transaction

I estimate this task took a little longer than half a day. I spent a significant time testing the endpoint on Postman first. The biggest challenge was more of a design issue; firstly I didn't want the end user to have to refresh the page in order to see the new transaction created, I instead opted to call the function I wrote to get all transactions upon the user successfully creating a transaction. Additionally, I realized that unless the table was sorted, the user would need to browse through a list of transactions to verify whether their new transaction had been created.

I opted to show the user a message that disappears after 8 seconds, upon the user creating a transaction. This would serve as validation that a transaction had been created. I initially wanted to use one library here to help users sort transactions (https://www.kryogenix.org/code/browser/sorttable/) by each column to more easily find the most recently created transactions. Despite that this library incorrectly sorts the amounts, I opted to use it because users would be able to sort transactions by transaction date. I believe this is a useful feature making the table more readable.

I also opted to build a function to disable the button to submit the form until the user has entered all necessary details to the form. I figured this was both good for user experience and would mitigate against incomplete data being sent to the `CreateTransaction` endpoint. I additionally opted to disable the option for users to select a transaction later than the present day. I assumed there would be no practical reason for a person to record a transaction in a future date. I also disabled the option for users to enter a decimal for the amount entered, again assuming that since we are recording amounts in cents there would be no reason to use decimals when entering an amount.

### Dealing with API Credentials
To adequetly secure API Credentials I created a .env that I used to store the API Credentials given and then used the phpdotenv package (link below) to access my .env variables. This process took about an hour.

https://packagist.org/packages/vlucas/phpdotenv

### Writing Tests
I wanted to write a few custom tests to check whether all the login form input tabs are correctly loaded when the user loads the index.php file, whether client side errors remain hidden when the page first loads and if the sidebar buttons remain hidden while the user initially. For these tests I assumed the initial load would be carried out a point when the user had not been authenticated and took this assumption into consideration in my tests. This took about an hour to write out.

## Additional Challenges

A lot of challenges centered around learning PHP for the first time - this was just a matter of practicing more, finding some PHP code, copying it, breaking down to understand how it worked and then re-building my own functions with what I had learned. Aside from this, there were a lot of css challenges. I really wanted this site to atleast somewhat resemble the Expensify landing page, everything from the sidebar to the buttons in the sidebar, the footer and color scheme. Resolving these challenges was a matter of trial and error. I spent an additional day and a half revising the project, ensuring that I had answered all questions and refactoring my code where I saw it relevant.


