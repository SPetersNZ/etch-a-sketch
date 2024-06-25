const slider = document.getElementById("sizeRange");
const outputVertical = document.getElementById("sliderXVertical");
const outputHorizontal = document.getElementById("sliderYHorizontal");
const divParent = document.getElementById("divParent");
const divSubChild = document.querySelectorAll(".divSubChild");
const clearButton = document.getElementById("clearButton")
const toggleGridButton = document.getElementById("toggleGrid");
const eraserButton = document.getElementById("eraser");
const rainbowButton = document.getElementById("rainbowMode")
const colorModeButton = document.getElementById("colorMode");
const colorSelector = document.getElementById("selectedColor");
document.getElementById("sizeRange").step = "16";

function pageLoad(defaultValue) {
    changeGridSize(defaultValue);
    slider.value = defaultValue;
    outputVertical.innerText = defaultValue;
    outputHorizontal.innerText = defaultValue;
    toggleGridButton.style.background = "grey";
    colorModeButton.style.background = "grey";
    colorSelector.value = "#000000";
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
    var newOpacity = increaseOpacity(element);
    if (eraserButton.value == "on") {
        element.style.backgroundColor = "rgba(255, 255, 255)";
        element.style.opacity = 1.0;
    } else if (rainbowButton.value == "on") {
        element.style.backgroundColor = rainbowFill();
        element.style.opacity = newOpacity
    } else if (colorModeButton.value == "on") {
        element.style.backgroundColor = colorSelector.value;
        element.style.opacity = newOpacity;
    } else {
        // do nothing
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
            divParent.addEventListener("mousedown", () => {
                divSubChild.addEventListener("mouseenter", mouseHandler);
            });
            window.addEventListener("mouseup", () => {
                divSubChild.removeEventListener("mouseenter", mouseHandler);
            });
            divSubChild.style.backgroundColor = "rgb(255, 255, 255)";
            if (toggleGridButton.value == "off") {
                divSubChild.classList.toggle("noBorder");
            }
        }
    }
}

function mouseHandler(e) {
    squareFill(e.target)
}

clearButton.addEventListener("click", () => {
    const divSubChild = document.querySelectorAll(".divSubChild");
    divSubChild.forEach(divSubChild => {
        divSubChild.style.backgroundColor = "white";
    });
});

toggleGridButton.addEventListener("click", () => {
    buttonValueCheck(toggleGridButton);
    const divSubChild = document.querySelectorAll(".divSubChild");
    divSubChild.forEach(divSubChild => {
        divSubChild.classList.toggle("noBorder");
    });
});

eraserButton.addEventListener("click", () => {
    buttonValueCheck(eraserButton);
});

rainbowButton.addEventListener("click", () => {
    buttonValueCheck(rainbowButton);
});

colorModeButton.addEventListener("click", () => {
    buttonValueCheck(colorModeButton);
});

function buttonValueCheck(element) {
    if (element.value == "on") {
        element.value = "off";
        element.style.background = "";
    } else {
        element.value = "on";
        element.style.background = "grey";
    }
    singleOptionSelect(element);
}

function singleOptionSelect(element) {
    if (element == eraserButton && eraserButton.value == "on") {
        rainbowButton.value = "off";
        rainbowButton.style.background = "";
        colorModeButton.value = "off";
        colorModeButton.style.background = "";
    } else if (element == rainbowButton && rainbowButton.value == "on") {
        eraserButton.value = "off";
        eraserButton.style.background = "";
        colorModeButton.value = "off";
        colorModeButton.style.background = "";
    } else if (element == colorModeButton && colorModeButton.value == "on") {
        eraserButton.value = "off";
        eraserButton.style.background = "";
        rainbowButton.value = "off";
        rainbowButton.style.background = "";
    } else {
        // do nothing
    }
}

function increaseOpacity(element) {
    var newOpacity = 0;
    var increment = 0.1;
    currentOpacity = window.getComputedStyle(element).opacity;
    if (element.style.backgroundColor == "rgb(255, 255, 255)") {
        newOpacity = increment;
    } else if (currentOpacity < 1) {
        currentOpacity = Number(currentOpacity);
        newOpacity = currentOpacity + increment;
    } else if (currentOpacity >= 1) {
        newOpacity = 1;
    }
    return newOpacity;
}