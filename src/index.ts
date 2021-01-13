import './styles.css';

let billAmount = 0;
let tipPercentage = .20;

const amountInput = document.getElementById('amountInput') as HTMLInputElement;
const billAmountSpan = document.getElementById('billAmountSpan') as HTMLSpanElement;
const tipPercentageSpan = document.getElementById('tipPercentageSpan') as HTMLSpanElement;
const amountToTipSpan = document.getElementById('amountToTipSpan') as HTMLSpanElement;
const totalToBePaidSpan = document.getElementById('totalToBePaidSpan') as HTMLSpanElement;

amountInput.addEventListener('keyup', handleChange);
amountInput.addEventListener('keydown', filterKeys);

document.querySelectorAll('#tipButtons>button').forEach(button => {
    button.addEventListener('click', updateTip)
});

function filterKeys(event: KeyboardEvent) {
    if (event.key === 'e') {
        event.preventDefault();
    }
}

function handleChange() {
    billAmount = isNaN(amountInput.valueAsNumber) ? 0 : amountInput.valueAsNumber;
    billAmountSpan.innerText = billAmount.toString();
    tipPercentageSpan.innerText = (tipPercentage * 100).toString();
    amountToTipSpan.innerText = (billAmount * tipPercentage).toString();
    totalToBePaidSpan.innerText = ((billAmount * tipPercentage) + billAmount).toString();
}

function updateTip() {
    const buttonTheyClicked = this as HTMLButtonElement;
    tipPercentage = parseFloat(this.dataset.tip);
    handleChange();
}