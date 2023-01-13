/* This file handles all the logic for the laptop
 * presentation and buying features.
 */
const balanceElement = document.getElementById("balance");
const getLoanElement = document.getElementById("loan-btn");
const loanDebtElement = document.getElementById("loan-debt");

let currentBalance = 0.0;
let currentLoanDebt = 0.0;

const getLoanDebt = () => currentLoanDebt;
const getCurrentBalance = () => currentBalance;

/* Changes the local variable currentBalance and the 
 * balance amount on the screen by adding the difference 
 * paramenter to currentbalance.
 */
const changeBalance = difference => {
    currentBalance += parseFloat(difference);;
    changeBalanceOnScreen();
}

const changeBalanceOnScreen = () => balanceElement.innerText = "Balance:\t" + currentBalance + " SEK";
const changeDeptOnScreen = () => loanDebtElement.innerText = "Debt: " + currentLoanDebt + " SEK\n";
/* Changes the local variable newLoanDebt and the 
 * loan amount on the screen by setting it the 
 * newLoanDebt parameter.
 */
const changeLoanDebt = newLoanDebt => {
    currentLoanDebt = newLoanDebt;
    changeDeptOnScreen();
    if (currentLoanDebt <= 0) {
        loanDebtElement.style.display = "inline";
        toggleRepayLoanBtn();
    }
}
/* This function is the handler for getting a
 * loan. It provides the user with a promt were
 * the user writes it desired amount to borrow
 * and whether it achieves the criterias it either
 * adds a loan and changes the balance or provides 
 * the user with a message.
 */
const getLoanHandler = () => {
    let loanAmount = window.prompt('Please enter amount you would like to loan (SEK):');
    
    if (currentLoanDebt <= 0 && currentBalance * 2 >= loanAmount) {
        addLoan(loanAmount);
        changeBalance(loanAmount);
    } else {
        alert("Unfortunely you do not meet the criterias to get this loan");
    }
}
/* This function adds a loan and updates the screen
 * with the loan amount and displays the repay button
 */
const addLoan = loanAmount => {
    currentLoanDebt = loanAmount;
    changeDeptOnScreen();
    toggleRepayLoanBtn();
    loanDebtElement.style.display = "inline";
}

getLoanElement.addEventListener("click", getLoanHandler);