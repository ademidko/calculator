let money = +prompt('Ваш месячный доход?');

let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 15000;
const period = 5

const showTypeOf = function(date){
    console.log(date, typeof(date));
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

function getExpensesMonth (sum1, sum2) {
    return sum1 + sum2;    
}

const amount = getExpensesMonth(amount1, amount2);

function getAccumulatedMonth (income, expenses) {
   return income - expenses; 
}

const accumulatedMonth = accumulatedMonth(money, amount);



const months = Math.ceil(mission / accumulatedMonth);
console.log(months);

const budgetDay = Math.floor(budgetMonth / 30);

console.log(budgetDay);

if (budgetDay >= 1200) {
    console.log('У вас высокий доход');
} else if (budgetDay >= 600 || budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 || budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}

