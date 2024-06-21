const slider = document.getElementById("sizeRange");
const outputVertical = document.getElementById("sliderXVertical");
const outputHorizonal = document.getElementById("sliderYHorizontal");
const divParent = document.getElementById("divParent");

outputVertical.innerText = slider.value;
outputHorizonal.innerText = slider.value;

slider.oninput = function() {
    while (divParent.hasChildNodes()) {
        divParent.removeChild(divParent.firstChild);
    }
    outputVertical.innerText = this.value;
    outputHorizonal.innerText = this.value;
    console.log(this.value);
    for (i = 0; i < this.value; i++) {
        const divChild = document.createElement("div");
        divChild.setAttribute("id", "divChild"+[i]);
        document.getElementById("divParent").appendChild(divChild);
    }
    for (i = 0; i < this.value; i++) {
        for (j = 0; j < this.value; j++) {
            const divSubChild = document.createElement("div");
            divSubChild.setAttribute("id", "divSubChild");
            document.getElementById("divChild"+[i]).appendChild(divSubChild);
        }
    }
}