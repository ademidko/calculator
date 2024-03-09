
let start = document.getElementById('start');
plusButtons = document.querySelectorAll("button.btn_plus"),
    incomPlus = plusButtons[0],
    expensesPlus = plusButtons[1],
    checkbox = document.querySelector("#deposit-check"),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitleInput = document.querySelector(".income-title"),
    incomeAmountInput = document.querySelector(".income-amount"),
    expensesTitleInput = document.querySelector(".expenses-title"),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositBankSelect = document.querySelector(".deposit-bank"),
    depositAmountInput = document.querySelector(".deposit-amount"),
    depositPercentInput = document.querySelector(".deposit-percent"),
    targetAmount = document.querySelector(".target-amount"),
    periodSelect = document.querySelector(".period-select"),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.title.period-amount'),
    textInputs = document.querySelectorAll('input[type="text"]');

const checkItemIncome = function (string) {
    return /^\d+$/.test(string);
};

const checkNumber = function (num) {
    return !isNaN(parseInt(num)) && isFinite(num) && num !== 0;
};

const AppDate = function () {

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.procentDeposit = 0;
    this.moneyDeposit = 0;
    this.incomeManth = 0;

}

AppDate.prototype.start = function () {

    if (salaryAmount.value === '') {
        alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
        return;
    }

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddImcome();
    this.getBudget();

    this.showResult();

    currentTextContent = start.textContent;
    start.textContent = currentTextContent === 'Рассчитать' ? 'Сбросить' : 'Рассчитать';

    textInputs.forEach(function (input) {

        input.disabled = currentTextContent === 'Рассчитать' ? true : false;
        input.value = currentTextContent === 'Рассчитать' ? input.value : '';

    })
};

AppDate.prototype.addExpensesBlock = function () {

    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};

AppDate.prototype.addIncomeBlock = function () {

    let cloneIcomesItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIcomesItem, incomPlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        incomPlus.style.display = 'none';
    }
};

AppDate.prototype.showResult = function () {

    periodSelect.addEventListener('input', this.getValueRange);
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = appDate.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();

};

AppDate.prototype.getAddExpenses = function () {

    let addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    })

};

AppDate.prototype.getExpenses = function () {

    const _this = this;
    expensesItems.forEach(function (item) {

        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = item.querySelector('.expenses-amount').value;

        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }

    })
};

AppDate.prototype.getIncome = function () {

    const _this = this;

    incomeItems.forEach(function (item) {
        const itemIncome = item.querySelector('.income-title').value;
        const cashIncome = item.querySelector('.income-amount').value;

        if (itemIncome !== '' && cashIncome !== '') {
            _this.expenses[itemIncome] = cashIncome;
        }

    })

    for (let key in _this.income) {
        _this.incomeManth += +_this.income[key];
    }
};

AppDate.prototype.getAddImcome = function () {
    const _this = this;
    additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    })
};

AppDate.prototype.getExpensesMonth = function () {
    for (const key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};

AppDate.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeManth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppDate.prototype.getTargetMonth = function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppDate.prototype.getStatusIncome = function () {
    return this.budgetDay >= 1200
        ? 'У вас высокий доход'
        : this.budgetDay >= 600
            ? 'У вас средний уровень дохода'
            : this.budgetDay >= 0
                ? 'К сожалению у вас уровень дохода ниже среднего'
                : 'Что-то пошло не так';
};

AppDate.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        do {
            this.procentDeposit = +prompt('Какой у вас годовой процент депозита?', 10);
        } while (!checkNumber(this.procentDeposit));

        do {
            this.moneyDeposit = +prompt('Какая сумма заложена?', 1000);
        } while (!checkNumber(this.moneyDeposit));
    }
};

AppDate.prototype.calcSavedMoney = function () {
    return this.budgetMonth * periodSelect.value;
};

AppDate.prototype.getValueRange = function (event) {
    periodAmount.textContent = event.target.value;
};

AppDate.prototype.controlVisibility = function () {

    start.style.pointerEvents = (salaryAmount.value !== '') ? 'auto' : 'none';
    start.disabled = salaryAmount.value === '';
};

AppDate.prototype.addEventListener = function () {

    salaryAmount.addEventListener('input', this.controlVisibility);
    start.addEventListener('click', this.start.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomPlus.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', this.getValueRange.bind(this));
};

const appDate = new AppDate();

console.log(appDate);


start.disabled = true;
start.style.pointerEvents = 'none';
appDate.addEventListener();

// if (appDate.getTargetMonth() > 0) {
//     console.log('Цель будет достигнута за ' + appDate.getTargetMonth() + ' месяца');
// } else {
//     console.log('Цель НЕ будет достигнута');
// }