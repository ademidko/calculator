let money = +prompt('Ваш месячный доход?');

let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 15000;
const period = 5

const showTypeOf = function (date) {
    console.log(date, typeof (date));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев и цель заработать ${mission} рублей/долларов/гривен/юани`);

addExpenses.toLocaleLowerCase()
console.log(addExpenses.split(', '));

const expenses1 = prompt('Введите обязательную статью расходов');
const amount1 = +prompt('Во сколько это обойдется?');

const expenses2 = prompt('Введите обязательную статью расходов');
const amount2 = +prompt('Во сколько это обойдется?');


function getExpensesMonth(sum1, sum2) {

    if (typeof sum1 !== 'number') {
        sum1 = 0
    }

    if (typeof sum2 !== 'number') {
        sum2 = 0
    }

    return sum1 + sum2;
}
const amount = getExpensesMonth(amount1, amount2);

function getAccumulatedMonth(income, expenses) {
    return income - expenses;
}
const accumulatedMonth = getAccumulatedMonth(money, amount);

function getTargetMonth(mission, accumulatedMonth) {
    return Math.ceil(mission / accumulatedMonth)
}
const months = getTargetMonth(mission, accumulatedMonth);
if (months > 0) {
    console.log('Цель будет достигнута через ' + months);
} else {
    console.log('Цель НЕ будет достигнута через');
}

const budgetDay = Math.floor(months / 30);
console.log(budgetDay);

const getStatusIncome = function (budgetDay) {
    if (budgetDay >= 1200) {
        return 'У вас высокий доход';
    } else if (budgetDay >= 600 || budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (budgetDay < 600 || budgetDay >= 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
        return 'Что то пошло не так';
    }

}
console.log(getStatusIncome(budgetDay));