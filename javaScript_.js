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