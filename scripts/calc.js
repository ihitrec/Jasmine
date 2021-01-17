
//  Drink About game 
function whatCanIDrink(age) {
    if (age < 0) {
        return "Sorry. I can’t tell what drink because that age is incorrect!";
    } else if (age < 14) {
        return "Drink Toddy";
    } else if (age < 18) {
        return "Drink Coke";
    } else if (age < 21) {
        return "Drink Beer";
    } else if (age < 130) {
        return "Drink Whisky";
    } else {
        return "Sorry. I can’t tell what drink because that age is incorrect!";
    }
}

// Fizzbuzz

function fizzBuzz(number) {
    if (number % 3 === 0 && number % 5 === 0) {
        return "FizzBuzz";
    } else if (number % 3 === 0) {
        return "Fizz";
    } else if (number % 5 === 0) {
        return "Buzz";
    } else {
        return number;
    }
}




function sevenBoom(arr) {
    let stringArray = arr.join("");
    for (i = 0; i < stringArray.length; i++) {
        if (stringArray[i] === "7") {
            return "Boom!";
        }
        if (i === stringArray.length - 1) {
            return "there is no 7 in the array";
        }
    }

}
