function random(max) {
	return Math.floor(Math.random() * max);
}
let md = {
	line: [],
	num_iterations: 0,
	setStartPoints(p1, p2) {
		this.line.push(p1);
		this.line.push(p2);
	},
	setDisplacement(displacement) {
		this.displacement = displacement;
	},
	generateMidpointDisplacement(iter) {
		let new_pts = []
		this.line.forEach((elem, idx, arr) => {
			if(idx > 0) {
				let new_x = Math.floor((arr[idx - 1].x + elem.x) / 2);
				let new_displacement = random(this.displacement) * (-1) * random(2);
				let new_y = Math.floor((arr[idx - 1].y + elem.y) / 2) + new_displacement;
				let new_pt = new md.Point(new_x, new_y);
				new_pts.push(new_pt);
			}
		});
		//reduce displacement
		this.displacement *= 1/(this.line.length/2);

		for(let i = 0; i < new_pts.length; i++) {
			this.line.splice((2 * i) + 1, 0, new_pts[i]);
		}

		this.num_iterations++;
	},
	Point: class {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}
	},
	random: random
};



module.exports = md;