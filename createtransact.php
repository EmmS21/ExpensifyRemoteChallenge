<div id="create-container">
    <form  method="post" onChange="btnActivation()">
        <div class="close" onClick="hideCreate()">X</div>  
        <h1>Create Transaction</h1>
        <fieldset>
            <label for="created">Created:</label>
            <input type="date" id="created" name="created" placeholder="Transaction Created" max="<?php echo date("Y-m-d"); ?>">
		    <label for="amount">Amount:</label>
            <input type="number" id="amount" name="amount" placeholder="Enter amount in cents" oninput="this.value|=0"> 
		    <label for="merchant">Merchant:</label>
            <input type="text" id="merchant" name="merchant" placeholder="Enter Merchant">          
        </fieldset>
        <button id="create-transaction" class="create-button" type="submit" disabled>Submit</button>
    </form>
</div>


