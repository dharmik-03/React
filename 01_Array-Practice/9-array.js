//filter

const num = [1, 2, 3, 4, 5, 6]

console.log(num.filter((n) => n > 5))
console.log(num.filter((n) => n > 6))
console.log(num.filter((n) => n < 6))

//map


const number = [1, 2, 3, 4, 5]

const result = number.map((x) => x + 1)
console.log('new array', result)

const result2 = number.map((x) => x * 5)
console.log('new array', result2)


//reduce

const num2 =[1,2,3,4,5]

console.log(num2.reduce((num1,num2)=> num1+=num2))