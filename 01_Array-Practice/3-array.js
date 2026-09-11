//adding and remove element in array

const car = ["BMW", "Mercedes", "RR"]


//add in last

car.push("tata")


console.log(car)

//add in first

car.unshift("mahindra")
console.log(car)

//remove in last

car.pop()
console.log(car)

//remove in first

car.shift()
console.log(car)


//splice


const arr = [10, 10, 20, 30, 40, 50, 60]

//delete


arr.splice(1,1)
console.log(arr)

//add

arr.splice(6,6,70)
console.log(arr)


//replace

arr.splice(6,6,80)
console.log(arr)

