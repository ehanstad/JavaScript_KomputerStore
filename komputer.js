const computerSelectElement = document.getElementById("laptops");
const computerFeaturesElement = document.getElementById("laptop-features");
const computerInformationElement = document.getElementById("information-section");

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
    selectedComputer = computers[0];
}

const handleComputerInventoryChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    selectedComputer.specs.map(spec => {
        const featureElement = document.createElement("p");
        featureElement.innerText = spec;
        computerFeaturesElement.appendChild(featureElement);
    });
    console.log(selectedComputer);
    const computerImgElement = document.createElement("img");
    const computerTitleElement = document.createElement("h2");
    const computerDescripitionElement = document.createElement("p");
    const computerPriceElement = document.createElement("p");

    let img =computerImgElement.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectedComputer.image;
    console.log(img);
    computerTitleElement.appendChild(document.createTextNode(selectedComputer.title));
    computerDescripitionElement.appendChild(document.createTextNode(selectedComputer.description));
    computerPriceElement.appendChild(document.createTextNode(selectedComputer.price));

    computerInformationElement.appendChild(computerImgElement);
    computerInformationElement.appendChild(computerDescripitionElement);
    computerInformationElement.appendChild(computerPriceElement);
}

computerSelectElement.addEventListener("change", handleComputerInventoryChange);