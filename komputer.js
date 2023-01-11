const computerSelectElement = document.getElementById("laptops");
const computerFeaturesElement = document.getElementById("laptop-features");
const computerInformationElement = document.getElementById("information-section");
const computerImgElement = document.getElementById("laptop-img");
const computerTitleElement = document.getElementById("laptop-title");
const computerDescripitionElement = document.getElementById("laptop-discription");
const computerPriceElement = document.getElementById("laptop-price");

let computers = [];

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToInventory(computers));

const addComputersToInventory = (computers) => {
    computers.map(computer => {
        const computerOptionElement = document.createElement("option");
        computerOptionElement.value = computer.id;
        computerOptionElement.appendChild(document.createTextNode(computer.title));
        computerSelectElement.appendChild(computerOptionElement);
    });

    
}

const handleComputerInventoryChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    
    console.log(computerTitleElement);
    //console.log(selectedComputer);
    //console.log(computerDescripitionElement);

    /*selectedComputer.specs.map(spec => {
        const featureElement = document.createElement("p");
        featureElement.innerText = spec;
        computerFeaturesElement.appendChild(featureElement);
    });*/

    //const computerImgElement = document.createElement("img");
    //const computerTitleElement = document.createElement("h2");
    //const computerDescripitionElement = document.createElement("p");
    //const computerPriceElement = document.createElement("p");

    computerImgElement.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectedComputer.image;

    computerTitleElement.innerText = selectedComputer.title;
    computerDescripitionElement.innerText = selectedComputer.description;
    computerPriceElement.innerText = selectedComputer.price;

    console.log(computerTitleElement);
}

computerSelectElement.addEventListener("change", handleComputerInventoryChange);