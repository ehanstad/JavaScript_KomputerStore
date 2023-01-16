/* This file handles all the logic for the laptop
 * presentation and buying features.
 */
import { balanceElement, getLoanElement, loanDebtElement } from './elements.js';
import { toggleRepayLoanBtn } from './work.js'

let currentBalance = 0.0;
let currentLoanDebt = 0.0;

export const getLoanDebt = () => currentLoanDebt;
export const getCurrentBalance = () => currentBalance;

/* Changes the local variable currentBalance and the 
 * balance amount on the screen by adding the difference 
 * paramenter to currentbalance.
 */
export const changeBalance = difference => {
    currentBalance += parseFloat(difference);;
    changeBalanceOnScreen();
}

export const changeBalanceOnScreen = () => balanceElement.innerText = `Balance:\t${currentBalance} SEK`;
const changeDeptOnScreen = () => loanDebtElement.innerText = `Debt:\t${currentLoanDebt} SEK\n`;
/* Changes the local variable newLoanDebt and the 
 * loan amount on the screen by setting it the 
 * newLoanDebt parameter.
 */
export const changeLoanDebt = newLoanDebt => {
    currentLoanDebt = newLoanDebt;
    changeDeptOnScreen();
    if (currentLoanDebt <= 0) {
        loanDebtElement.style.display = "none";
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

    if (currentLoanDebt <= 0 && currentBalance * 2 >= loanAmount && !loanAmount.isNaN && loanAmount > 0) {
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