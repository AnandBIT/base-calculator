//jshint esversion: 6

const input = document.getElementById("input-box");
const radioBtn = $("input[type='radio']");
let prevBtn = $("input[type='radio']:checked").attr("id").split("-")[1];
let operator;


$("#AC").click(() => {
    input.textContent = "";
});

$("#DEL").click(() => {
    input.textContent = input.textContent.slice(0, -1);
});

$("#point").click((e) => {
    input.textContent += e.target.textContent;
});

$("#calcSum, #calcDiff, #calcPro, #calcDiv").click((e) => {
    input.textContent += e.target.textContent;
    operator = e.target.textContent;
});

$("#equalTo").click(() => {
    if (input.textContent && operator)
        calculate(operator);
});


let ar = "#0,#1,#2,#3,#4,#5,#6,#7,#8,#9,#A,#B,#C,#D,#E,#F";
$(ar).toggleClass("inactive");

let checkedBtn = $("input[type='radio']:checked").attr("id").split("-")[1];
activate(checkedBtn);

function activate(checkedBtn) {
    $(ar).off();
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
    let presentBtn = this.id.split("-")[1];
    activate(presentBtn);

    if (input.textContent) {
        let decimal = anyToDec(input.textContent, prevBtn);
        input.textContent = Number(decimal).toString(Number(presentBtn)).toUpperCase();
    }
    prevBtn = presentBtn;
});



// Function to change from any base to base-10 number

function anyToDec(i, radix) {
    let integer = parseInt(i, radix);
    let sum = 0;
    let fraction = i.split(".")[1];
    if (fraction) {
        for (let j = 0; j < fraction.length; j++) {
            let temp = fraction[j];
            if (['A', 'B', 'C', 'D', 'E', 'F'].includes(temp))
                temp = parseInt(temp, 16);
            sum += temp * Math.pow(radix, Number(`-${j+1}`));
        }
    }

    return integer + sum;
}



// Function for arithmetic operations

function calculate(operator) {
    let base = $("input[type='radio']:checked").attr("id").split("-")[1];
    let operands = input.textContent.split(operator);

    operands = operands.map((e) => {
        return anyToDec(e, base);
    });

    finalResult = operands[0];
    operands.shift();
    operands.map((e) => {
        if (operator === "+") {
            finalResult += e;
        } else if (operator === "-") {
            finalResult -= e;
        } else if (operator === "*") {
            finalResult *= e;
        } else if (operator === "/") {
            finalResult /= e;
        }
    });
    input.textContent = Number(finalResult).toString(Number(base)).toUpperCase();
}