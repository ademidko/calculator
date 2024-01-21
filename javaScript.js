
// доп задание 

// 1
const num = 266219;

// 2 
let arrNum = num.toString().split('');
let product = 1; 

for (let i = 0; i < arrNum.length; i++) {
    product *= parsnt(arrNum[i]);
}
console.log(product);

// 3 
let productDegree = product**3;
console.log(productDegree);

// 4 
console.log(productDegree.toString().slice(0,2));



