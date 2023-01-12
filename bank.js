const balanceElement = document.getElementById("balance");
const getLoanElement = document.getElementById("loan-btn");
const loanDebtElement = document.getElementById("loan-debt");

let currentBalance = 0.0;
let currentLoanDebt = 0.0;

const getLoanDebt = () => {
    return currentLoanDebt;
}

const getCurrentBalance = () => {
    return currentBalance;
}

const changeBalance = difference => {
    currentBalance += parseFloat(difference);;
    changeBalanceOnScreen();
}

const changeBalanceOnScreen = () => {
    balanceElement.innerText = "Balance:\t" + currentBalance + " SEK";
}

const changeDeptOnScreen = () => {
    loanDebtElement.innerText = "Debt: " + currentLoanDebt + " SEK";
}

const changeLoanDebt = newLoanDebt => {
    currentLoanDebt = newLoanDebt;
    changeDeptOnScreen();
    if (currentLoanDebt <= 0) {
        loanDebtElement.style.display = "inline";
        toggleRepayLoanBtn();
    }
}

const getLoanHandler = () => {
    let loanAmount = window.prompt('Please enter amount you would like to loan (SEK):');
    console.log(loanAmount);
    toggleRepayLoanBtn();
    if (currentLoanDebt <= 0 && currentBalance * 2 >= loanAmount) {
        addLoan(loanAmount);
        changeBalance(loanAmount);
    } else {
        alert("Unfortunely you do not meet the criterias to get this loan");
    }
}

const addLoan = loanAmount => {
    currentLoanDebt = loanAmount;
    changeDeptOnScreen();
    loanDebtElement.style.display = "inline";
}

getLoanElement.addEventListener("click", getLoanHandler);