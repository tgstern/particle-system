// variable initializers
var particleArray = [];
var numParticles = 500;
var startHue = 0;

// particle class definition
class Particle {
	// constructor function to build particle with constrained random pos, size, color, speed properties
	constructor() {
		this.pos = createVector(random(width), random(height));
		this.size = random(5, 30);
		this.color = color(random(startHue, startHue+45), random(40, 80), 100);
		this.speed = random(-4, 4);
	}
	// move particle method - adds speed to the x position for horizontal movement on canvas
	move() {
		this.pos.add(createVector(this.speed, 0));
	}
	// grow particle method - scale up the size if particle is not already at max
	grow() {
		if (this.size < max(width, height)) {
			this.size *= 1.25;
		}
	}
}

// setup canvas in window, set HSB color, and create the particle array data points
function setup() {
	colorMode(HSB);
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < numParticles; i++) {
		particleArray.push(new Particle());
	}
}

function draw() {
	clear();
	// loop over particle objects in the array
	for (let i = 0; i < particleArray.length; i++) {
		// remove particle from array if it crosses either x dimension end of the canvas, and push a new instance to the particle array
		if (particleArray[i].pos.x + particleArray[i].size < 0 || particleArray[i].pos.x - particleArray[i].size > width) {
			particleArray.splice(i, 1);
			particleArray.push(new Particle());
		}
		// grow nearby particle on mouse press using the grow() method
		if (abs(mouseX - particleArray[i].pos.x) < 50 && abs(mouseY - particleArray[i].pos.y) < 50 && mouseIsPressed) {
			particleArray[i].grow();
		}
		// draw an ellipse for each particle in the array and animate it with the move() method
		ellipse(particleArray[i].pos.x, particleArray[i].pos.y, particleArray[i].size);
		fill(particleArray[i].color);
		particleArray[i].move();
	}
}

// change between warm-cool colors, clear particle array, and call setup() to generate new system
function doubleClicked() {
	startHue = (startHue + 180) % 360;
	particleArray = [];
	setup();
}
