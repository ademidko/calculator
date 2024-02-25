
let start = document.getElementById('start');
plusButtons = document.querySelectorAll("button.btn_plus");
incomPlus = plusButtons[0];
expensesPlus = plusButtons[1];
checkbox = document.querySelector("#deposit-check");
additionalIncomeItem = document.querySelectorAll('.additional_income-item');
budgetMonthValue = document.querySelector('.budget_month-value');
budgetDayValue = document.querySelector('.budget_day-value');
expensesMonthValue = document.querySelector('.expenses_month-value');
additionalIncomeValue = document.querySelector('.additional_income-value');
additionalExpensesValue = document.querySelector('.additional_expenses-value');
incomePeriodValue = document.querySelector('.income_period-value');
targetMonthValue = document.querySelector('.target_month-value');
salaryAmount = document.querySelector('.salary-amount');
incomeTitleInput = document.querySelector(".income-title");
incomeAmountInput = document.querySelector(".income-amount");
expensesTitleInput = document.querySelector(".expenses-title");
expensesItems = document.querySelectorAll('.expenses-items');
additionalExpensesItem = document.querySelector('.additional_expenses-item');
depositBankSelect = document.querySelector(".deposit-bank");
depositAmountInput = document.querySelector(".deposit-amount");
depositPercentInput = document.querySelector(".deposit-percent");
targetAmount = document.querySelector(".target-amount");
periodSelect = document.querySelector(".period-select");
incomeItems = document.querySelectorAll('.income-items');
periodAmount = document.querySelector('.title.period-amount');

const checkItemIncome = function (string) {
    return /^\d+$/.test(string);
};

const checkNumber = function (num) {
    return !isNaN(parseInt(num)) && isFinite(num) && num !== 0;
};

const appDate = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    procentDeposit: 0,
    moneyDeposit: 0,
    incomeManth: 0,

    start: function () {

        if (salaryAmount.value === '') {
            alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
            return;
        }

        appDate.budget = +salaryAmount.value;

        appDate.getExpenses();
        appDate.getIncome();
        appDate.getExpensesMonth();
        appDate.getAddExpenses();
        appDate.getAddImcome();
        appDate.getBudget();

        appDate.showResult();


    },

    addExpensesBlock: function () {

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },


    addIncomeBlock: function () {

        let cloneIcomesItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIcomesItem, incomPlus);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomPlus.style.display = 'none';
        }
    },

    showResult: function () {

        periodSelect.addEventListener('input', appDate.getValueRange);
        budgetMonthValue.value = appDate.budgetMonth;
        budgetDayValue.value = appDate.budgetDay;
        expensesMonthValue.value = appDate.expensesMonth;
        additionalExpensesValue.value = appDate.addExpenses.join(', ');
        additionalIncomeValue.value = appDate.addIncome.join(', ');
        targetMonthValue.value = appDate.getTargetMonth();
        incomePeriodValue.value = appDate.calcSavedMoney();
        
    },

    getAddExpenses: function () {

        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appDate.addExpenses.push(item);
            }
        })

    },

    getExpenses: function () {
        expensesItems.forEach(function (item) {

            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                appDate.expenses[itemExpenses] = cashExpenses;
            }

        })
    },

    getIncome: function () {

        incomeItems.forEach(function (item) {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                appDate.expenses[itemIncome] = cashIncome;
            }

        })

        for (let key in appDate.income) {
            appDate.incomeManth += +appDate.income[key];
        }
    },

    getAddImcome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appDate.addIncome.push(itemValue);
            }
        })
    },

    getExpensesMonth: function () {
        for (const key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },

    getBudget: function () {
        appDate.budgetMonth = appDate.budget + appDate.incomeManth - appDate.expensesMonth;
        appDate.budgetDay = Math.floor(appDate.budgetMonth / 30);
    },

    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / appDate.budgetMonth);
    },

    getStatusIncome: function () {
        return this.budgetDay >= 1200
            ? 'У вас высокий доход'
            : this.budgetDay >= 600
                ? 'У вас средний уровень дохода'
                : this.budgetDay >= 0
                    ? 'К сожалению у вас уровень дохода ниже среднего'
                    : 'Что-то пошло не так';
    },

    getInfoDeposit: function () {
        if (this.deposit) {
            do {
                this.procentDeposit = +prompt('Какой у вас годовой процент депозита?', 10);
            } while (!checkNumber(this.procentDeposit));

            do {
                this.moneyDeposit = +prompt('Какая сумма заложена?', 1000);
            } while (!checkNumber(this.moneyDeposit));
        }
    },

    calcSavedMoney: function () {
        return this.budgetMonth * periodSelect.value;
    },

    getValueRange: function (event) {
        periodAmount.textContent = event.target.value;
        appDate.start();
    },
    
    controlVisibility: function(){
        
        start.style.pointerEvents = (salaryAmount.value !== '')? 'auto' : 'none';
        start.disabled = salaryAmount.value === ''; 
    }


};
// start.disabled = true;
start.style.pointerEvents = 'none';
salaryAmount.addEventListener('input', appDate.controlVisibility);
start.addEventListener('click', appDate.start);
expensesPlus.addEventListener('click', appDate.addExpensesBlock);
incomPlus.addEventListener('click', appDate.addIncomeBlock);
periodSelect.addEventListener('input', appDate.getValueRange);

// if (appDate.getTargetMonth() > 0) {
//     console.log('Цель будет достигнута за ' + appDate.getTargetMonth() + ' месяца');
// } else {
//     console.log('Цель НЕ будет достигнута');
// }