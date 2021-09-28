const getBill = document.getElementById('bill');
const alltipBtns = document.querySelectorAll('.tip');
const customTip = document.getElementById('cus-tip');
const person = document.getElementById('people');
const errormsg = document.querySelector('.error_msg');
const result = document.querySelectorAll('.value');

getBill.addEventListener('input', getBillValue);
alltipBtns.forEach(btn => {
    btn.addEventListener('click', valueClicks);
});

customTip.addEventListener('input', setCustomValue);
person.addEventListener('input', setPersonValue);

let billValue = 0.0;
let tipValue = 0.15;
let personValue = 1;

function isfloatValid(v){
    var ptr = /^[0-9]*\-?[0-9]*$/;
    return v.match(ptr);
}

function isCustomValidInt(v){
    var ptr =  /^[0-9]*/;
    return v.match(ptr);
}

function getBillValue() {

    if (getBill.value.includes(',')){
        getBill.value = getBill.value.replace(',','.');
    }
    if(!isfloatValid(getBill.value)){
        getBill.value = getBill.value.substring(0, getBill.value.length-1);
    }

    billValue = parseFloat(getBill.value);

    calculateTip();
    //console.log(billValue);
}

function valueClicks(e){
    alltipBtns.forEach(btn => {
        btn.classList.remove('btn-active');

        if(e.target.innerHTML == btn.innerHTML){
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    });

    // clear custom on click
    customTip.value = '';

    calculateTip();
    //console.log(tipValue);
}

function setCustomValue(){
    if(!isCustomValidInt(customTip.value)){
        customTip.value = customTip.value.substring(0, customTip.value.length-1);
    }
    tipValue = parseFloat(customTip.value/100);

    //disabled buttons
    alltipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    if(customTip.value != 0 ){
        calculateTip();
    }
    //console.log(tipValue);
}

function setPersonValue(){
    if(!isCustomValidInt(person.value)){
        person.value = person.value.substring(0, person.value.length-1);
    }

    personValue = parseFloat(person.value);
    if(personValue <= 0){
        errormsg.classList.add('show_errormsg');
        setTimeout(function(){
            errormsg.classList.remove('show_errormsg');
        },3000);
    }

    calculateTip();
    //console.log(personValue);
}

function calculateTip(){
    if(personValue >= 1){
        let tipAmount = billValue * tipValue / personValue;
        let total = billValue * (tipValue + 1) / personValue;
        result[0].innerHTML = '$' + tipAmount.toFixed(2);
        result[1].innerHTML = '$' + total.toFixed(2);
    }
} 


//console.log(alltipBtns[0].innerHTML);