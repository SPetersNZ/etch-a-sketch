const slider = document.getElementById("sizeRange");
const outputVertical = document.getElementById("sliderXVertical");
const outputHorizontal = document.getElementById("sliderYHorizontal");
const divParent = document.getElementById("divParent");
const divSubChild = document.querySelectorAll(".divSubChild");
document.getElementById("sizeRange").step = "16";

outputVertical.innerText = slider.value;
outputHorizontal.innerText = slider.value;

slider.oninput = function() {
    outputVertical.innerText = this.value;
    outputHorizontal.innerText = this.value;
}

slider.onchange = function() {
    changeGridSize(this.value);
}

function backgroundColor(element) {
    element.style.backgroundColor = "black";
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
                backgroundColor(e.target);
            });
        }
    }
}

function pageLoad(defaultValue) {
    changeGridSize(defaultValue);
    slider.value = defaultValue;
    outputVertical.innerText = defaultValue;
    outputHorizontal.innerText = defaultValue;
}

pageLoad(16);