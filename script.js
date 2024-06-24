//todo list;
//1. implement color picker
//2. implement gradual color gradient for each hover over square
//3. click and drag to add color to square
//4. toggle eraser button to turn off if rainbow mode selected, & vice versa
//      can a button check go into a function?

const slider = document.getElementById("sizeRange");
const outputVertical = document.getElementById("sliderXVertical");
const outputHorizontal = document.getElementById("sliderYHorizontal");
const divParent = document.getElementById("divParent");
const divSubChild = document.querySelectorAll(".divSubChild");
const clearButton = document.getElementById("clearButton")
const toggleGridButton = document.getElementById("toggleGrid");
const eraserButton = document.getElementById("eraser");
const rainbowButton = document.getElementById("rainbowMode")
document.getElementById("sizeRange").step = "16";

function pageLoad(defaultValue) {
    changeGridSize(defaultValue);
    slider.value = defaultValue;
    outputVertical.innerText = defaultValue;
    outputHorizontal.innerText = defaultValue;
    toggleGridButton.style.background = "grey";
}

pageLoad(16);

outputVertical.innerText = slider.value;
outputHorizontal.innerText = slider.value;

slider.oninput = function() {
    outputVertical.innerText = this.value;
    outputHorizontal.innerText = this.value;
}

slider.onchange = function() {
    changeGridSize(this.value);
}

function squareFill(element) {
    if (eraserButton.value == "on") {
        element.style.backgroundColor = "white";
    } else if (rainbowButton.value == "on") {
        element.style.backgroundColor = rainbowFill();
    } else {
        element.style.backgroundColor = "black";
    }
}

function rainbowFill() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function changeGridSize(gridSize) {
    while (divParent.hasChildNodes()) {
        divParent.removeChild(divParent.firstChild);
    }
    for (let i = 0; i < gridSize; i++) {
        const divChild = document.createElement("div");
        divChild.setAttribute("id", "divChild"+[i]);
        divParent.appendChild(divChild);
        for (let j = 0; j < gridSize; j++) {
            const divSubChild = document.createElement("div");
            divSubChild.setAttribute("class", "divSubChild");
            divChild.appendChild(divSubChild);
            divSubChild.addEventListener("mouseout", function (e) {
                squareFill(e.target);
            });
            if (toggleGridButton.value == "off") {
                divSubChild.classList.toggle("noBorder");
            }
        }
    }
}

clearButton.addEventListener("click", () => {
    const divSubChild = document.querySelectorAll(".divSubChild");
    divSubChild.forEach(divSubChild => {
        divSubChild.style.backgroundColor = "white";
    });
});

toggleGridButton.addEventListener("click", () => {
    if (toggleGridButton.value == "on") {
        toggleGridButton.value = "off";
        toggleGridButton.style.background = "";
    } else {
        toggleGridButton.value = "on";
        toggleGridButton.style.background = "grey";
    }
    const divSubChild = document.querySelectorAll(".divSubChild");
    divSubChild.forEach(divSubChild => {
        divSubChild.classList.toggle("noBorder");
    });
});

eraserButton.addEventListener("click", () => {
    if (eraserButton.value == "on") {
        eraserButton.value = "off";
        eraserButton.style.background = "";
    } else {
        eraserButton.value = "on";
        eraserButton.style.background = "grey";
    }
});

rainbowButton.addEventListener("click", () => {
    if (rainbowButton.value == "on") {
        rainbowButton.value = "off";
        rainbowButton.style.background = "";
    } else {
        rainbowButton.value = "on";
        rainbowButton.style.background = "grey";
    }
});