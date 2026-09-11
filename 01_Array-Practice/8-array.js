//find and findIndex

//find


const num = [0, 1, 2, 3, 4, 5, 6]

console.log(num.find((value) => value > 5))

//findIndex

console.log(num.findIndex((value) => value > 4))


//some


console.log(num.some((num) => num > 10))
console.log(num.some((num) => num > 4))

//every

console.log(num.every((x) => x >= 0))
console.log(num.every((x) => x > 1))