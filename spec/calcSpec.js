
// Drink About game
describe("Drink About game", function () {
    describe("returns a drink depending on age", function () {
        it("should return 'Sorry. I can’t tell what drink because that age is incorrect!' if age is less than 0", function () {
            let message = whatCanIDrink(-1);
            expect(message).toBe("Sorry. I can’t tell what drink because that age is incorrect!");
        });
        it("should return 'Drink Toddy' if age is less than 14", function () {
            let message = whatCanIDrink(13);
            expect(message).toBe("Drink Toddy");
        });
        it("should return 'Drink Coke' if age is less than 18", function () {
            let message = whatCanIDrink(17);
            expect(message).toBe("Drink Coke");
        });
        it("should return 'Drink Beer' if age is less than 21", function () {
            let message = whatCanIDrink(20);
            expect(message).toBe("Drink Beer");
        });
        it("should return 'Drink Whisky' if age is less than 130", function () {
            let message = whatCanIDrink(129);
            expect(message).toBe("Drink Whisky");
        });
        it("should return 'Sorry. I can’t tell what drink because that age is incorrect!' if all others fail", function () {
            let message = whatCanIDrink("A");
            expect(message).toBe("Sorry. I can’t tell what drink because that age is incorrect!");
        });
    });

});

// Fizzbuzz

describe("Fizzbuzz game", function () {
    it("should return FizzBuzz if the number is divisible by 3 and 5", function () {
        let word = fizzBuzz(15);
        expect(word).toBe("FizzBuzz");
    });
    it("should return Fizz if the number is divisible by 3", function () {
        let word = fizzBuzz(9);
        expect(word).toBe("Fizz");
    });
    it("should return Buzz if the number is divisible by 5", function () {
        let word = fizzBuzz(20);
        expect(word).toBe("Buzz");
    });
    it("should return the input if the number is not divisible by either number", function () {
        let word = fizzBuzz(16);
        expect(word).toBe(16);
    });

})