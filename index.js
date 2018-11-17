const decimalBtn = document.getElementById('calc-decimal');
const clearBtn = document.getElementById('calc-clear');
const backspaceBtn = document.getElementById('calc-backspace');
const displayValElement = document.getElementById('calc-display-val');

const calcNumBtns = document.getElementsByClassName(
'calc-btn-num');
const calcOperatorBtns = document.getElementsByClassName('calc-btn-operator');

let displayVal = '0';
let pendingVal;
let evalStringArray = [];

const updateDisplayVal = clickObj => {
  const btnText = clickObj.target.innerText;
  
  if(displayVal === '0') {
    displayVal = '';
  }
  if(displayVal.length < 8) {
    displayVal += btnText;
    displayValElement.innerText = displayVal;
  }
}

const performOperation = clickObj => {
  const operator = clickObj.target.innerText;
  switch(operator) {
    case '-':
    case '+':
      evalStringArray.push(displayVal);
      displayVal = '0';
      evalStringArray.push(operator);
      break;
    case '÷':
      evalStringArray.push(displayVal);
      displayVal = '0';
      evalStringArray.push('/');
      break;
    case '×':
      evalStringArray.push(displayVal);
      displayVal = '0';
      evalStringArray.push('*');
      break;
    case '=':
      evalStringArray.push(displayVal);
      evaluation = eval(evalStringArray.join(' '));
      //console.log(evaluation);
      if(evaluation.toString().length > 8) {
        displayValElement.innerText = 'Error';
      } else {
        displayValElement.innerText = evaluation;
      }
      evalStringArray = [];
  }
}

for(let i = 0; i < calcNumBtns.length; i++) {
  calcNumBtns[i].addEventListener('click', updateDisplayVal, false);
}

for(let i = 0; i < calcOperatorBtns.length; i++) {
  calcOperatorBtns[i].addEventListener('click', performOperation, false);
}

clearBtn.onclick = () => {
  displayVal = '0';
  pendingVal = undefined;
  evalStringArray = [];
  displayValElement.innerText = displayVal;
}

backspaceBtn.onclick = () => {
  displayVal = displayVal.slice(0, displayVal.length - 1);
  if(displayVal === '') {
    displayVal = '0';
  }
  displayValElement.innerText = displayVal;
}

decimalBtn.onclick = () => {
  if(!displayVal.includes('.')) {
    displayVal += '.';
  }
  displayValElement.innerText = displayVal;
}