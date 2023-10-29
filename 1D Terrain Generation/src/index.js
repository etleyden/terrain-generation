let p5 = require('p5');
let gui = new dat.GUI({name: "GUI"});
let md = require('./midpoint_displacement.js');
let ds = require('./diamond_square.js');
let Point = md.Point;
let random = md.random;
let heightMap = {
	red: 0.1,
	yellow: 0.5,
	green:0.7,
	blue: 1,
};
gui.add(heightMap, 'red').min(0).max(1).step(0.01);
gui.add(heightMap, 'yellow').min(0).max(1).step(0.01);
gui.add(heightMap, 'green').min(0).max(1).step(0.01);
gui.add(heightMap, 'blue').min(0).max(1).step(0.01);

class GenerationMethod {
	static MidpointDisplacement = new GenerationMethod("Midpoint Displacement");
	static DiamondSquare = new GenerationMethod("Diamond-square");
	constructor(name) {
		this.name = name;
	}
}

// NOTE: to change generation method, please do so at this line
let generation_method = GenerationMethod.DiamondSquare;


//midpoint displacement starting config
const MAX_X = window.innerWidth;
const MAX_Y = window.innerHeight;
const LINE_RESOLUTION = 500; //deprecated
const START_Y = Math.floor(window.innerHeight / 2);
const INIT_DISPLACEMENT = Math.floor(window.innerHeight / 3);

//diamond square starting config

//start generation
if(generation_method == GenerationMethod.MidpointDisplacement) {
	let left_pt = new Point(0, START_Y + random(INIT_DISPLACEMENT));
	let right_pt = new Point(MAX_X, START_Y + random(INIT_DISPLACEMENT));
	md.setDisplacement(INIT_DISPLACEMENT);
	md.setStartPoints(left_pt, right_pt);
} else if(generation_method == GenerationMethod.DiamondSquare) {
	ds.init(500, 0.1);
}
// draw on the canvas
let s = (sk) => {
	sk.setup = () => {
	    sk.createCanvas(window.innerHeight,window.innerHeight);
	    sk.background(40);
	    sk.frameRate(5);
	}
	sk.draw = () => {
		if(generation_method == GenerationMethod.MidpointDisplacement) {
			sk.background(40);

			//draw the line
			md.line.forEach((elem, idx, arr) => {
				sk.strokeWeight(1);
				sk.stroke(255);
				if(idx > 0) {
					sk.line(arr[idx - 1].x, arr[idx - 1].y, elem.x, elem.y);
				}
			});
			//generate a new set of points between the current ones
			if(md.num_iterations < 9) {
				md.generateMidpointDisplacement(1);
			}
		} else if(generation_method == GenerationMethod.DiamondSquare) {
			sk.background(0, 0, 255);
			sk.strokeWeight(0);
			//compute the dimensions of each square
			let unit_size = Math.floor(window.innerHeight / ds.size);		

			ds.map.forEach((row, y_idx) => {
				row.forEach((value, x_idx) => {
					if(value || value == 0) {
						
						switch(true) {
							case (value < heightMap.red):
								sk.fill("red");
								break;
							case (value < heightMap.yellow):
								sk.fill("yellow");
								break;
							case (value < heightMap.green):
								sk.fill("green");
								break;
							case (value < heightMap.blue):
								sk.fill("blue");
								break;
						}

					} else {
						sk.fill("red");
					}
					sk.square(x_idx * unit_size, y_idx * unit_size, unit_size)
				});
			});

			ds.iterate();
		}
	}
}

const p = new p5(s);

function stringify(array) {
	return JSON.parse(JSON.stringify(array));
}

