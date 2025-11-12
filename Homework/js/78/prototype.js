
function Vehicle(color) {
    this.color = color;
    this.speed = 0;
}

Vehicle.prototype.go = function (speed) {
    this.speed = speed;
    console.log(`Now going at speed ${speed}`);
};

Vehicle.prototype.print = function () {
    console.log(`Vehicle color: ${this.color}, current speed: ${this.speed}`);
};


function Plane(color) {

    Vehicle.call(this, color);
}


Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;


Plane.prototype.go = function (speed) {
    this.speed = speed;
    console.log(`Now FLYING at speed ${speed}`);
};


const jet = new Plane('white');
jet.print();
jet.go(900);
jet.print();     
