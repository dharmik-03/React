//some


const number=[10,20,30,40,50,60,70,80,90]

console.log("Some array ",number)
console.log("Some array ",number.some((number)=>{
    return number > 90;
}))

//reverse

console.log("reverse",number.reverse())


//value 

let numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const num = numArray.values();

for (let value of num) {
  console.log("value", value);
}