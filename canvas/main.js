document.getElementById('test').width = window.innerWidth;
document.getElementById('test').height = window.innerHeight;
var ctx = document.getElementById('test').getContext('2d');
var dim = [document.getElementById('test').width, document.getElementById('test').height];

class Ball {
	constructor(r = 25, p = [25, 25], v = [500, 500], col = [255, 255, 255, 1], traces) {
		this.radius = r;
		this.pos = new Vector(p);
		this.vel = new Vector(v);
		if (traces > 0) { 
			this.trace = [Array.from(this.pos)];
			this.trailLength = Math.trunc(traces) };
		this.r = col[0];
		this.g = col[1];
		this.b = col[2];
		this.a = (isNaN(col[3]))? 1: col[3];
		this.doTrace = (traces > 0)? true : false;
	};
	
	addTrace( arr, l ) {
		this.trace.push( Array.from(arr));
		if (!isNaN(l)) {
			//remove oldest trail values
			if (this.trace.length > l) { this.trace.shift() };
		};
	};
	
	onUpdate(dt) {
		if ((this.pos[0] + (this.vel[0]*dt)) > dim[0] || (this.pos[0] + (this.vel[0]*dt)) < 0) {
		this.vel[0] = this.vel[0]*-1; };
		if ((this.pos[1] + (this.vel[1]*dt)) > dim[1] || (this.pos[1] + (this.vel[1]*dt)) < 0) {
		this.vel[1] = this.vel[1]*-1; };
		/*
		this.pos[0] = this.pos[0] + (this.vel[0]*dt);
		this.pos[1] = this.pos[1] + (this.vel[1]*dt);
		console.log(this.pos);//*/
		//*
		let add = Vector.vscale(this.vel, dt);
		this.pos = Vector.vadd(this.pos, add);
		if(this.doTrace == true) { this.addTrace(this.pos, this.trailLength) };
	};
	draw() {
		//*
		if (this.doTrace == true) {
			for (let i = 0; i < this.trace.length; i++) {
				let alpha = (i+1) * (1/this.trace.length);
				alpha = (alpha > 1)? 1 : alpha;
				let col = `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`;
				ctx.save();
				ctx.fillStyle = col;
				ctx.translate(this.trace[i][0], this.trace[i][1]);
				ctx.beginPath();
				ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
				ctx.fill();
				ctx.restore();
			};
		} else {
			ctx.save();
			ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
			ctx.translate(this.pos[0], this.pos[1]);
			ctx.beginPath();
			ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		};
		//*/
		/*
		ctx.save();
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();//*/
		//*
	};
};

var now = new Date();
var last = now;
var trail = (Math.random() >= 0.5)? true : false;
var tail = (trail)? 0 : Math.random()*100;
//var traceOn = (trail)? false : true;
var r = Math.random()*48;
var p = [Math.random()*dim[0], Math.random()*dim[1]];
console.log(p);
var v = [(Math.random()-.5)*1000, (Math.random()-.5)*1000];
console.log(v);
var col = [Math.trunc(Math.random()*255), Math.trunc(Math.random()*255), Math.trunc(Math.random()*255)];
var circle = new Ball(r, p, v, col, tail);
//var circle = new Ball(r, p, v);
//ctx.fillStyle = 'rgba('+ Math.trunc(Math.random()*255) +', '+ Math.trunc(Math.random()*255) +', '+ Math.trunc(Math.random()*255) +', 1)';
//ctx.fillStyle = 'rgba(96, 100, 136, 1)';
function update() {
	if (trail == false){ ctx.clearRect(0, 0, dim[0], dim[1]); };
	//ctx.clearRect(0, 0, dim[0], dim[1]);
	now = new Date();
	var dt = (now - last)/1000;
	circle.onUpdate(dt);
	circle.draw();
	last = new Date();

	window.requestAnimationFrame(update);
};

window.requestAnimationFrame(update);

