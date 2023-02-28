<!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
	<div id="create-container">
        <form  method="post">  
            <h1>Create Transaction</h1>
            <fieldset>
                <label for="created">Created:</label>
                <input type="date" id="created" name="created" placeholder="Transaction Created">
		        <label for="amount">Amount:</label>
                <input type="number" id="amount" name="amount" placeholder="Enter amount"> 
		        <label for="merchant">Merchant:</label>
                <input type="text" id="merchant" name="merchant" placeholder="Enter Merchant">          
            </fieldset>
            <button class="create-button" type="submit">Submit</button>
        </form>
    </div>
