// задание 1
const lang = 'ru';

if (lang === 'ru') {
  console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
} else if (lang === 'en') {
  console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
}

switch (lang) {
  case 'ru':
    console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
    break;
  case 'en':
    console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
    break;
}

const daysOfWeek = {
  ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
};

const translatedDays = daysOfWeek[lang];
console.log(translatedDays.join(', '));

// задание 2 

let namePerson = "Артем";
var role = namePerson === "Артем" ? "Директор" : namePerson === "Максим" ? "Преподаватель" : "Студент";

console.log(role);

const str =  3;

const func = function (string) {

  if (string === 'string') {
    let newStr = string.trim();
    return (newStr.length <= 30) ? newStr : newStr.substring(0, 30) + '...';
  } else {
    return 'Передан неправильный тип данных';
  }
}

console.log(func(str));

let arr = [];

for (let i = 0; i < 7; i++) {
  let randomNumber = Math.floor(Math.random() * 20) + 1;
  arr.push('' + randomNumber);
}
console.log(arr);

for (let i = 0; i < arr.length; i++) {
  let firstDigit = arr[i][0];
  if (firstDigit === '2' || firstDigit === '4') {
    console.log(arr[i]);
  }
}

function isPrime(number) {
  if (number < 2) {
    return false;
  }
  
  for (let divisor = 2; divisor <= Math.sqrt(number); divisor++) {
    if (number % divisor === 0) {
      return false;
    }
  }
  
  return true;
}

for (let number = 2; number <= 100; number++) {
  if (isPrime(number)) {
    console.log(number + " (Делители этого числа: 1 и " + number + ")");
  }
}

