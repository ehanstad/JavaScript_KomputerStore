/* This file handles all the logic for all the work block
 * It includes the bank- and work button
 */

const salaryElement = document.getElementById("salary");
const bankBtnElement = document.getElementById("bank-btn");
const workBtnElement = document.getElementById("work-btn");
const repayLoanBtnElement = document.getElementById("repay-loan-btn");

let currentSalary = 0.0;

/* This function is the handler for the bank transfers.
 * It transfers the payment amount the balance and if the 
 * user has a current loan it pays it of by 10%.
 */
const handleBankTransfer = () => {
    const loanAmount = getLoanDebt();
    if (loanAmount > 0) {
        const salaryToLoan = currentSalary * 0.1;
        currentSalary -= salaryToLoan;
        if (salaryToLoan > loanAmount) {
            currentSalary += (salaryToLoan - loanAmount);
            changeLoanDebt(0);
        } else {
            changeLoanDebt(loanAmount-salaryToLoan)
        }
    }
    changeBalance(currentSalary);
    currentSalary = 0.0;
    changeSalaryOnScreen();
}
/* This function is the handler for payments. It will add 
 * 100 SEK to the currentSalary and updates it the screen
 */
const handleWorkPayment = () => {
    currentSalary += 100;
    changeSalaryOnScreen();
}
/* This function is the handler for loan repayments. It will
 * take away the amount from the loan as much as possible and 
 * the possible extra amount will be added to the users balance.
 */
const handleRepayLoan = () => {
    const loanAmount = getLoanDebt();
    const extra = currentSalary - loanAmount;
    if (extra > 0) {
        changeBalance(extra);
        changeLoanDebt(0);
    } else {
        changeLoanDebt(loanAmount-currentSalary);
    }
    currentSalary = 0.0;
    changeSalaryOnScreen();
}
/* This function will toggle the repay loan button be vissable or
 * hidden
 */
const toggleRepayLoanBtn = () => {
    if (repayLoanBtnElement.style.display == "inline") {
        repayLoanBtnElement.style.display = "none";
    } else {
        repayLoanBtnElement.style.display = "inline";
    }
}
/* This function will update the salary amount on the screen
 */
const changeSalaryOnScreen = () => salaryElement.innerText = "Pay:\t" + currentSalary + " SEK";

bankBtnElement.addEventListener("click", handleBankTransfer);
workBtnElement.addEventListener("click", handleWorkPayment);
repayLoanBtnElement.addEventListener("click", handleRepayLoan);