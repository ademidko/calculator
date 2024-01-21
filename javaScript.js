let money = 100000; 
let income = 'фриланс'; 
let addExpenses = 'Интернет, такси, коммуналка'; 
const deposit = true; 
const mission = 15000;
const period = 5

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ${period} месяцев и цель заработать ${mission} рублей/долларов/гривен/юани');
console.log(addExpenses.split(addExpenses.toLocaleLowerCase()));

let budgetDay = money / 30;
console.log(budgetDay);

