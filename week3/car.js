class Car {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }
  displayInfo() {
    console.log(`Car Information: ${this.year} ${this.brand} ${this.model}`);
  }
}

const car1 = new Car('Toyota', 'Corolla', 2020);
const car2 = new Car('Honda', 'Civic', 2019);
console.log(car1);
car1.displayInfo();