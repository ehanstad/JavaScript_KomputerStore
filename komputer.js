const computerSelectElement = document.getElementById("laptops");
const computerFeaturesElement = document.getElementById("laptop-features");
const computerFeaturesTextElement = document.getElementById("laptop-features-text");

const computerInformationElement = document.getElementById("information-section");
const computerImgElement = document.getElementById("laptop-img");
const computerTitleElement = document.getElementById("laptop-title");
const computerDescripitionElement = document.getElementById("laptop-discription");
const computerPriceElement = document.getElementById("laptop-price");
const buyBtnElement = document.getElementById("buy-btn");

let computers = [];
let selectedComputer = {};

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToInventory(computers))
    .catch(err => document.body.innerHTML = `$(err)`);

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

const changeSelectedComputerOnScreen = () => {
    let imgSrc = "https://hickory-quilled-actress.glitch.me/" + selectedComputer.image;
    computerImgElement.src = imgSrc;
    computerTitleElement.innerText = selectedComputer.title;
    computerDescripitionElement.innerText = selectedComputer.description;
    computerPriceElement.innerText = selectedComputer.price + " SEK";
}

const handleComputerInventoryChange = e => {
    selectedComputer = computers[e.target.selectedIndex];

    changeFeatures(selectedComputer);
    changeSelectedComputerOnScreen();
}

const handleBuyLaptop = () => {
    currentBalance = getCurrentBalance();
    laptopPrice = parseFloat(computerPriceElement.innerText.split(" ")[0]);
    laptopTitle = computerTitleElement.innerText;
    if (currentBalance >= laptopPrice) {
        changeBalance(-laptopPrice);
        alert(`Congrats you are the owner of a ${laptopTitle}`);
    } else {
        alert(`You do are too poor man`);
    }
}

const changeFeatures = selectedComputer =>  {
    let specs = "";
    selectedComputer.specs.map(spec => {
        specs = specs + spec + "\n";
    });
    computerFeaturesTextElement.innerText = specs;
}

computerSelectElement.addEventListener("change", handleComputerInventoryChange);
buyBtnElement.addEventListener("click", handleBuyLaptop);