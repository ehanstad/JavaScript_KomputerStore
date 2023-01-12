const salaryElement = document.getElementById("salary");
const bankBtnElement = document.getElementById("bank-btn");
const workBtnElement = document.getElementById("work-btn");
const repayLoanBtnElement = document.getElementById("repay-loan-btn");

let currentSalary = 0.0;

const handleBankTransfer = () => {
    const loanAmount = getLoanDebt();
    if (loanAmount > 0) {
        console.log("You got a loan");
        const salaryToLoan = currentSalary * 0.1;
        currentSalary -= salaryToLoan;
        if (salaryToLoan > loanAmount) {
            currentSalary += (salaryToLoan - loanAmount);
            changeLoanDebt(0);
        } else {
            changeLoanDebt(loanAmount-salaryToLoan)
        }
    }
    console.log("current salary: " + currentSalary);
    changeBalance(currentSalary);
    currentSalary = 0.0;
    changeSalaryOnScreen();
}

const handleWorkPayment = () => {
    currentSalary += 100;
    changeSalaryOnScreen();
}

const handleRepayLoan = () => {
    console.log("log");
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

const toggleRepayLoanBtn = () => {
    if (repayLoanBtnElement.style.display == "inline") {
        repayLoanBtnElement.style.display = "none";
    } else {
        repayLoanBtnElement.style.display = "inline";
    }
}

const changeSalaryOnScreen = () => {
    salaryElement.innerText = "Pay\t" + currentSalary + "SEK";
}

bankBtnElement.addEventListener("click", handleBankTransfer);
workBtnElement.addEventListener("click", handleWorkPayment);
repayLoanBtnElement.addEventListener("click", handleRepayLoan);