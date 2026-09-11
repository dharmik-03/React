//concat

const fruit=["mango","watermelon","orange"]

const car=["BMW","mercedes","Tata","mahindra"]

console.log(car.concat(fruit))

//toString

console.log(car.toString())

//join (array to string)

console.log(car.join(" "))

// flat (reduce nested)

const num=[
    [1,2,3],
    [4,5,6],
    [7,8,9],
]

console.log(num)
console.log(num.flat())


//infinity

const number=[
    [1,[20,30,[40]],2,3,[50]],
    [4,5,[20,[40,[10]]],6],
    [7,[10,[39]],8,9]
]


console.log(number)
console.log(number.flat(Infinity))

//slice

const num2=[1,2,3,4,5,6,7]

console.log(num2.slice(1,4))