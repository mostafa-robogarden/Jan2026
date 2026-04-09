let x: number = 5;
let text: string = "Hello, TypeScript!";

function greet(name: string): string {
    return `Hello, ${name}!`;
}
class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(): string {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
}