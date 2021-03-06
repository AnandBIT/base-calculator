//jshint esversion: 6

const input = document.getElementById("input-box");
const radioBtn = $("input[type='radio']");
let prevBtn = $("input[type='radio']:checked").attr("id");


$("#AC").click(() => {
    input.textContent = "";
});

$("#DEL").click(() => {
    input.textContent = input.textContent.slice(0, -1);
});

$("#point").click(() => {
    input.textContent += ".";
});


let ar = "#0,#1,#2,#3,#4,#5,#6,#7,#8,#9,#A,#B,#C,#D,#E,#F";
$(ar).toggleClass("inactive");

let checkedBtn = $("input[type='radio']:checked").attr("id");
activate(checkedBtn);

function activate(checkedBtn) {
    $(ar).off("click");
    $(ar).addClass("inactive");
    if (checkedBtn === "2") {
        let buttons = "#0,#1";
        handleUI(buttons);
    } else if (checkedBtn === "8") {
        let buttons = "#0,#1,#2,#3,#4,#5,#6,#7";
        handleUI(buttons);
    } else if (checkedBtn === "10") {
        let buttons = "#0,#1,#2,#3,#4,#5,#6,#7,#8,#9";
        handleUI(buttons);
    } else if (checkedBtn === "16") {
        handleUI(ar);
    }
}

function handleUI(buttons) {
    $(buttons).removeClass("inactive");
    $(buttons).click((e) => {
        input.textContent += e.target.textContent;
    });
}

radioBtn.change(function (e) {
    // console.log(e.target.id);
    // console.log(this.id);
    activate(this.id);
    // let x = anyToDec(input.textContent, this.id);


    if (input.textContent) {
        if (prevBtn === "10") {
            input.textContent = Number(input.textContent).toString(Number(this.id)).toUpperCase();
        } else {
            input.textContent = anyToDec(input.textContent, prevBtn);
            // console.log(anyToDec(input.textContent, prevBtn));
        }
    }
    prevBtn = this.id;
});

// anyToDec("110.10010", 2);
// console.log(anyToDec("110.10010", 2));

function anyToDec(i, radix) {
    let integer = parseInt(i, radix);
    let sum = 0;
    let fraction = i.split(".")[1];
    if (fraction) {
        for (let j = 0; j < fraction.length; j++) {
            sum += fraction[j] * Math.pow(radix, Number(`-${j+1}`));
        }
    }

    return integer + sum;
}