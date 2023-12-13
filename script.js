
let monsterInfo;

document.addEventListener("DOMContentLoaded", load);

function handleClick(event) {
    let monsterName = event.target.innerText.toLowerCase();

    document.getElementById("home_intro").style.display = "none";
    document.getElementById("monster_info").style.display = "block";

    let monsterId = monsterInfo.find(monster => monster.name === capitalizeFirstLetter(monsterName));

    let monsterInfoBlock = document.createElement("div");
    monsterInfoBlock.id = "monster_block";

    monsterInfoBlock.style.display = "flex";
    monsterInfoBlock.style.flexDirection = "column";

    let monsterNameDisplay = document.createElement("p");
    monsterNameDisplay.innerText = "Monster name: " + monsterId.name;
    monsterNameDisplay.style.margin = "0px";
    monsterNameDisplay.style.width = "100%";

    let monsterDescription = document.createElement("p");
    monsterDescription.innerText = "Monster Description: " + "\n" + monsterId.description;
    monsterDescription.style.margin = "0px";

    let monsterStatBlock = document.createElement("div");

    let stats = monsterId.stats;

    for (let stat in stats) {
        if (stats.hasOwnProperty(stat)) {
            let statParagraph = document.createElement("p");
            statParagraph.innerText = `${capitalizeFirstLetter(stat)}: ${stats[stat]}`;
            monsterStatBlock.appendChild(statParagraph);
        }
    }

    let monsterImage = document.createElement("img");
    monsterImage.src = "images/" + monsterName + ".png";
    monsterImage.width = 200;
    monsterImage.style.float = "right";
    monsterImage.style.paddingLeft = "150px";

    let monsterContentContainer = document.createElement("div");
    monsterContentContainer.style.display = "flex";

    monsterContentContainer.appendChild(monsterStatBlock);
    monsterContentContainer.appendChild(monsterImage);

    document.getElementById("monster_info").lastChild.remove(monsterInfoBlock);
    document.getElementById("monster_info").appendChild(monsterInfoBlock);
    document.getElementById("monster_block").appendChild(monsterNameDisplay);
    document.getElementById("monster_block").appendChild(monsterContentContainer);
    document.getElementById("monster_block").appendChild(monsterDescription);
}

function load() {
    fetch('monsters.json')
        .then(result => {
            return result.json()
        })
        .then(data => {
            monsterInfo = data;
        });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener('DOMContentLoaded', function () {
    let contactForm = document.getElementById('contactInfo');
    contactForm.addEventListener('submit', validateForm);
});

function validateForm(event) {
    let nameField = document.getElementById('name');
    let emailField = document.getElementById('email');
    let phoneField = document.getElementById('phone');

    let nameError = document.getElementById('name_error');
    let emailError = document.getElementById('email_error');
    let phoneError = document.getElementById('phone_error');

    // Reset previous error messages
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    phoneError.style.display = 'none';

    // Validate Name
    if (nameField.value.trim() === '') {
        nameError.style.display = 'block';
        nameField.focus();
        event.preventDefault(); // Prevent form submission
        return;
    }

    // Validate Email using Regular Expression
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value.trim())) {
        emailError.style.display = 'block';
        emailField.focus();
        event.preventDefault();
        return;
    }

    // Validate Phone Number using Regular Expression
    let phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneField.value.trim())) {
        phoneError.style.display = 'block';
        phoneField.focus();
        event.preventDefault();
        return;
    }
}