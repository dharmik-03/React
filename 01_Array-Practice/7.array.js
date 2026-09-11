//indexOf

const fruits = [
    "apple",
    "banana",
    "cheery",
    "mango",
    "watermelon",
    "grapes",
    "strawberry",
];

console.log("indexof banana is", fruits.indexOf("banana"))
console.log("indexof mango is", fruits.indexOf("mango"))
console.log("indexof grapes is", fruits.indexOf("grapes"))


//includes


const fruits1 = [
    "apple",
    "banana",
    "mango",
    "watermelon",
    "grapes",
    "strawberry",
];


console.log("includes mango", fruits1.includes("mango"))
console.log("includes cherry", fruits1.includes("cherry"))
console.log("includes apple", fruits1.includes("apple"))


//sort

//number sort

const num = [4, 2, 3, 6, 1, 5, 8, 7]

console.log("number sort", num.sort())

//alphabet

const alphabet = ["b", "d", "a", "c"]
console.log("alphabet sort", alphabet.sort())

//ascending

console.log("ascending ")
console.log(num.sort((a, b) => b - a))

//descending 

console.log("descending ")
console.log(num.sort((a, b) => a - b))