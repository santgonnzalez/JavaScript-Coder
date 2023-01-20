/* Armando un cotizador de seguros basico:  */

let insuranceTypes = [
    "Full Coverage",
    "Liability",
    "Collision",
];

let vehicleBrands = [
    "Toyota",
    "Ford",
    "Chevrolet",
    "BMW",
    "Mercedes",
    "Honda",
    "Nissan",
    "Hyundai",
    "Kia",
    "Mazda",
    "Volkswagen",
    "Audi",
    "Porsche",
    "Ferrari",
    "Lamborghini",
    "Ducati",
    "Harley Davidson",
    "Suzuki",
    "Yamaha",
    "Kawasaki",
    "Husqvarna",
    "Aprilia",
    "BMW Motorrad",
    "Indian",
    "Triumph",
    "Bentley",
    "Bugatti",
    "Jaguar",
    "Land Rover",
    "Range Rover",
    "Rolls Royce",
    "Cadillac",
    "GMC",
    "Jeep",
    "Ram",
    "Subaru",
    "Tesla",
    "Volvo",
    "Peugeot",
    "Renault",
    "Fiat",
    "Alfa Romeo",
    "Maserati",
    "McLaren",
    "Seat",
    "Skoda",
    "Smart",
    "Spyker",
];

let users = [];
// Clases & Constructors

class Vehicle {
    constructor(type, value, brand) {
        this.type = type;
        this.value = value;
        this.brand = brand;
    }
}

class User {
    constructor(name, ci, age, vehicle, yearsDriving) {
        this.name = name;
        this.ci = ci;
        this.age = age;
        this.vehicle = vehicle;
        this.yearsDriving = yearsDriving;
    }

    // Para agregar automaticamente a la lista users cada  usuario nuevo.
    addUser() {
        users.push(this);
    }

    calculateInsurance() {
        let rate = 0;
        if (this.age < 25) {
            rate = 0.1;
        } else if (this.age >= 25 && this.age < 35) {
            rate = 0.07;
        } else if (this.age >= 35 && this.age < 45) {
            rate = 0.05;
        } else if (this.age >= 45) {
            rate = 0.03;
        } else {
            console.log("Error: Invalid Age");
        }

        if (this.vehicle.type === "Economic") {
            rate += 0.01;
        } else if (this.vehicle.type === "Mid-range") {
            rate += 0.03;
        } else if (this.vehicle.type === "Luxury") {
            rate += 0.05;
        } else {
            console.log("Error: Invalid vehicle type");
        }

        if (this.yearsDriving < 5) {
            rate += 0.05;
        } else if (this.yearsDriving >= 5 && this.yearsDriving < 10) {
            rate += 0.03;
        } else if (this.yearsDriving >= 10) {
            rate += 0.01;
        } else {
            console.log("Error: Invalid years driving");
        }

        console.log(`The total insurance cost is $${rate * this.vehicle.value}`);
    }
    increaseCoverage() {
        this.vehicle.value += 1000;
        console.log(`The new vehicle value is $${this.vehicle.value}`);
        this.calculateInsurance();
    }

    changeVehicle(newVehicle) {
        this.vehicle = newVehicle;
        console.log(`Vehicle changed to ${this.vehicle.type}`);
        this.calculateInsurance();
    }
}

let age = parseInt(prompt("Enter your age: "));
if (isNaN(age) || age < 16) {
    console.log("Error: Invalid age");
}

let vehicleType = prompt(
    "Enter the vehicle type: \n -Economic \n -Mid-range \n -Luxury"
);
if (!["Economic", "Mid-range", "Luxury"].includes(vehicleType)) {
    console.log("Error: Invalid vehicle type");
}

let vehicleValue = parseInt(prompt("Enter the vehicle value: "));
if (isNaN(vehicleValue) || vehicleValue < 0) {
    console.log("Error: Invalid vehicle value");
}

let yearsDriving = parseInt(prompt("Enter the years of driving experience: "));
if (isNaN(yearsDriving) || yearsDriving < 0) {
    console.log("Error: Invalid years driving");
}

let vehicleBrand = prompt("Enter the vehicle brand: ");
if (!vehicleBrands.includes(vehicleBrand)) {
    console.log("Error: Invalid vehicle brand");
}

// Probando
/*
let user1 = new User(
    "John Doe",
    "123-456-789",
    age,
    new Vehicle(vehicleType, vehicleValue, vehicleBrand),
    yearsDriving
);
user1.calculateInsurance();
*/

const newUsers = [
    new User("Jane Smith", "123-456-789", 23, new Vehicle("Economic", 15000, "Toyota"), 3),
    new User("Mike Johnson", "987-654-321", 29, new Vehicle("Mid-range", 35000, "BMW"), 7),
    new User("Emily Davis", "111-222-333", 35, new Vehicle("Luxury", 75000, "Mercedes"), 10),
    new User("Jacob Martinez", "444-555-666", 45, new Vehicle("Economic", 10000, "Honda"), 15),
    new User("Michael Garcia", "777-888-999", 55, new Vehicle("Mid-range", 45000, "Nissan"), 20),
    new User("Emily Martinez", "000-111-222", 65, new Vehicle("Luxury", 125000, "Hyundai"), 25),
    new User("Jacob Rodriguez", "333-444-555", 25, new Vehicle("Economic", 17000, "Kia"), 2),
    new User("Michael Lopez", "666-777-888", 30, new Vehicle("Mid-range", 42000, "Mazda"), 8),
    new User("Emily Gonzalez", "999-000-111", 38, new Vehicle("Luxury", 80000, "Volkswagen"), 12),
    new User("Jacob Wilson", "222-333-444", 48, new Vehicle("Economic", 13000, "Audi"), 17)
];

newUsers.forEach(user => {
    console.log(`User: ${user.name}, CI: ${user.ci}, Age: ${user.age}, Vehicle: ${user.vehicle.brand} ${user.vehicle.type}, Years of driving experience: ${user.yearsDriving}`);
    user.calculateInsurance();
    console.log("\n");
});



