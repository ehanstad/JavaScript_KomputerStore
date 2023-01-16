/* This file handles all the logic for the laptop
 * presentation and buying features.
 */
import { computerSelectElement, computerFeaturesElement, computerFeaturesTextElement, computerInformationElement, computerImgElement, computerTitleElement, computerDescripitionElement, computerPriceElement, buyBtnElement } from './elements.js';
import { changeSalaryOnScreen } from './work.js';
import { getCurrentBalance, changeBalance, changeBalanceOnScreen } from './bank.js';

let computers = [];
let selectedComputer = {};

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToInventory(computers))
    .catch(err => document.body.innerHTML = `${err}`);
/* This function is the handler for fetching from the api
 * it maps all the fetched laptops to a local array, set
 * set the first fetched one to a selected computer and 
 * init the screen
 */
const addComputersToInventory = (computers) => {
    computers.map(computer => {
        const computerOptionElement = document.createElement("option");
        computerOptionElement.value = computer.id;
        computerOptionElement.appendChild(document.createTextNode(computer.title));
        computerSelectElement.appendChild(computerOptionElement);
    });
    selectedComputer = computers[0];
    changeSalaryOnScreen();
    changeBalanceOnScreen();
    changeFeatures(selectedComputer);
    changeSelectedComputerOnScreen();
}
/* This function changes the information about the selected
 * computer onto the screen
 */
const changeSelectedComputerOnScreen = () => {
    let imgSrc = `https://hickory-quilled-actress.glitch.me/${selectedComputer.image}`;
    computerImgElement.src = imgSrc;
    computerTitleElement.innerText = selectedComputer.title;
    computerDescripitionElement.innerText = selectedComputer.description;
    computerPriceElement.innerText = selectedComputer.price + " SEK";
}
/* This function is the handler if the user changes laptop
 * in the scrollbar and updates the information with the new
 * laptop features.
 */
const handleComputerInventoryChange = e => {
    selectedComputer = computers[e.target.selectedIndex];

    changeFeatures(selectedComputer);
    changeSelectedComputerOnScreen();
}
/* This function is the handler for the buying of a 
 * latop it checks the bank balance towards the laptop
 * price and informs the user whether it can buy laptop
 * or not.
 */
const handleBuyLaptop = () => {
    const currentBalance = getCurrentBalance();
    const laptopPrice = parseFloat(computerPriceElement.innerText.split(" ")[0]);
    const laptopTitle = computerTitleElement.innerText;
    if (currentBalance >= laptopPrice) {
        changeBalance(-laptopPrice);
        alert(`Congrats you are the owner of a ${laptopTitle}`);
    } else {
        alert(`You do unluckily not afford a ${laptopTitle}`);
    }
}
/* Updates the features of the selected computer onto the
 * screen. 
 */
const changeFeatures = selectedComputer => {
    let specs = "";
    selectedComputer.specs.map(spec => {
        specs = specs + spec + "\n";
    });
    computerFeaturesTextElement.innerText = specs;
}

computerSelectElement.addEventListener("change", handleComputerInventoryChange);
buyBtnElement.addEventListener("click", handleBuyLaptop);