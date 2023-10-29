//adjusted mod function for negative numbers
function mod(x, divisor) {
	let m = x % divisor;
	return m + (m < 0 ? divisor : 0);
}
function average(list) {
	let sum = 0;
	for(let i = 0; i < list.length; i++) {
		sum += list[i];
	}
	return sum / list.length;
}
function random(offset) {
	return Math.random() * offset;
}
//implementation will start with 0 for corner values
//this will probably make stitching more convenient
let ds = {
	map: [],
	size: 0,
	// 0--> not initialized, odd --> diamond step is next, even --> square step is next
	num_iterations: 0,
	isDiamondStep: false,
	Point: class {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}
	},
	init: function(size, offset) {
		//validate size is 2^n + 1
		if(Math.log2(size - 1) % 1 != 0) size = Math.pow(2, Math.floor(Math.log2(size - 1))) + 1;
		this.size = size;
		this.chunk_size = size - 1;
		this.offset = offset;
		let zero_pt = new ds.Point(0, 0);
		this.map = [...Array(size)].map(e => Array(size).fill(null));
		this.map[0][0] = 0;
		this.map[0][size - 1] = 0;
		this.map[size - 1][0] = 0;
		this.map[size - 1][size - 1] = 0;
		this.num_iterations = 1;
		this.isDiamondStep = true;
	},
	iterate: function() {
		if(this.num_iterations == 0) return;
		//the size of the square or diamond
		let dist = this.chunk_size / 2;
		if(dist < 1) return;
		let end_idx = this.size - 1;
		// the diamond step
		if(this.isDiamondStep) {
			//diamond size: size / (i * 2)
			//diamond step starts at diamond size idx of x and y and increment by size * 2
			//ref points are (x - ds, y - ds), (x + ds, y - ds), (x - ds, y + ds), (x + ds, y + ds) 
			for(let i = dist; i < this.size; i += 2*dist) {
				for(let j = dist; j < this.size; j+= 2*dist) {
					let y0 = mod(i - dist, end_idx);
					let y1 = mod(i + dist, end_idx);
					let x0 = mod(j - dist, end_idx);
					let x1 = mod(j + dist, end_idx);
					this.map[i][j] = average([
							this.map[y0][x0],
							this.map[y0][x1],
							this.map[y1][x0],
							this.map[y1][x1]
						]) + random(this.offset);
				}
			}
			this.isDiamondStep = false;
		} else { //square step
			//square size: size / (i * 2)
			//square step starts at (ss, 0) and increments by ss starting with 2nd row (0, ss)
			//ref points are (x + ss, y), (x - ss, y), (x, y + ss), (x, y - ss)
			//the square step will make two passes since the array is staggered
			for(let i = dist; i < this.size; i += 2*dist) {
				for(let j = 0; j < this.size; j += 2*dist) {
					let y0 = mod(i + dist, end_idx);
					let y1 = mod(i - dist, end_idx);
					let x0 = mod(j + dist, end_idx);
					let x1 = mod(j - dist, end_idx);
					this.map[i][j] = average([
							this.map[y0][j],
							this.map[y1][j],
							this.map[i][x0],
							this.map[i][x1]
						]) + random(this.offset);
				}
			}
			for(let i = 0; i < this.size; i += 2*dist) {
				for(let j = dist; j < this.size; j += 2*dist) {
					let y0 = mod(i + dist, end_idx);
					let y1 = mod(i - dist, end_idx);
					let x0 = mod(j + dist, end_idx);
					let x1 = mod(j - dist, end_idx);
					this.map[i][j] = average([
							this.map[y0][j],
							this.map[y1][j],
							this.map[i][x0],
							this.map[i][x1]
						]) + random(this.offset);
				}
			}


			offset = 1/(2*this.num_iterations);
			this.isDiamondStep = true;
			this.num_iterations++;
			this.chunk_size = Math.floor(this.chunk_size / 2);
		}
	}
}

module.exports = ds;