//import {Vector} from "./untitled.js";

var ctx = document.getElementById('test').getContext('2d');
var dim = [document.getElementById('test').width, document.getElementById('test').height];

class Ball {
	constructor(r = 25, p = [25, 25], v = [500, 500]){
		this.radius = r;
		this.pos = p;
		this.vel = v;
	};
	onUpdate(dt) {
		if ((this.pos[0] + (this.vel[0]*dt)) > dim[0] || (this.pos[0] + (this.vel[0]*dt)) < 0) {
		this.vel[0] = this.vel[0]*-1; };
		if ((this.pos[1] + (this.vel[1]*dt)) > dim[1] || (this.pos[1] + (this.vel[1]*dt)) < 0) {
		this.vel[1] = this.vel[1]*-1; };
		this.pos[0] = this.pos[0] + (this.vel[0]*dt);
		this.pos[1] = this.pos[1] + (this.vel[1]*dt);
	};
	draw() {
		ctx.save();
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	};
};

var now = new Date();
var last = now;
var circle = new Ball(Math.random()*50, [Math.random()*dim[0], Math.random()*dim[1]], [(Math.random()-.5)*1000, (Math.random()-.5)*1000]);
var trail = (Math.random() >= 0.5)? true : false;

function update() {
	if (trail == false){ ctx.clearRect(0, 0, dim[0], dim[1]); };
	now = new Date();
	var dt = (now - last)/1000;
	circle.onUpdate(dt);
	circle.draw();
	last = new Date();

	window.requestAnimationFrame(update);
};

window.requestAnimationFrame(update);
/*
var ctx = document.getElementById('test').getContext('2d');
var dim = [document.getElementById('test').width, document.getElementById('test').height];

class Ball {
	constructor(r = 25, p = [75, 75], v = [500, 500]){
		this.radius = r;
		this.pos = p;
		this.vel = v;
	};
	onUpdate(dt) {
		if ((this.pos[0] + (this.vel[0]*dt)) > dim[0] || (this.pos[0] + (this.vel[0]*dt)) < 0) {
		this.vel[0] = this.vel[0]*-1; };
		if ((this.pos[1] + (this.vel[1]*dt)) > dim[1] || (this.pos[1] + (this.vel[1]*dt)) < 0) {
		this.vel[1] = this.vel[1]*-1; };
		this.pos[0] = this.pos[0] + (this.vel[0]*dt);
		this.pos[1] = this.pos[1] + (this.vel[1]*dt);
	};
	draw() {
		ctx.save();
		//ctx.clearRect(0, 0, 640, 480);
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
		//ctx.arc(pos[0], pos[1], 25, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	};
};

var now = new Date();
var last = now;
var circle = new Ball();

function update() {
	ctx.clearRect(0, 0, dim[0], dim[1]);
	now = new Date();
	var dt = (now - last)/1000;
	circle.onUpdate(dt);
	circle.draw();
	last = new Date();

	window.requestAnimationFrame(update);
};

window.requestAnimationFrame(updateAll);
*/
/*
var ctx = document.getElementById('test').getContext('2d');
var dim = [document.getElementById('test').width, document.getElementById('test').height];

var pos = [75, 75];
var vel = [500, 500];
var radius = 25;
var now = new Date();
var last = now;

function update(dt) {
	if ((pos[0] + (vel[0]*dt)) > dim[0] || (pos[0] + (vel[0]*dt)) < 0) {
		vel[0] = vel[0]*-1; };
	if ((pos[1] + (vel[1]*dt)) > dim[1] || (pos[1] + (vel[1]*dt)) < 0) {
		vel[1] = vel[1]*-1; };
	pos[0] = pos[0] + (vel[0]*dt);
	pos[1] = pos[1] + (vel[1]*dt);
};

function draw() {
	ctx.save();
	//ctx.clearRect(0, 0, 640, 480);
	ctx.translate(pos[0], pos[1]);
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, Math.PI * 2);
	//ctx.arc(pos[0], pos[1], 25, 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();
};

function updateAll() {
	ctx.clearRect(0, 0, dim[0], dim[1]);
	now = new Date();
	var dt = (now - last)/1000;
	update(dt);
	draw();
	last = new Date();

	window.requestAnimationFrame(updateAll);
};

window.requestAnimationFrame(updateAll);
//*/
/*
var ctx = document.getElementById('test').getContext('2d');
var dim = [document.getElementById('test').width, document.getElementById('test').height];
var pos = [75, 75];
var vel = [100, 100];
var now = new Date();
var last = now;

function update() {
  now = new Date();
  var dt = (now - last)/1000;
  pos[0] = pos[0] + (vel[0]*dt);
  pos[1] = pos[1] + (vel[1]*dt);
  if ((pos[0]) > dim[0] || (pos[0]) < 0) {vel[0] = vel[0]*-1}
  if (pos[1] > dim[1] || pos[1] < 0) {vel[1] = vel[1]*-1}
  
  ctx.save();
  ctx.clearRect(0, 0, 640, 480);
  ctx.translate(pos[0], pos[1]);
  ctx.beginPath();
  //ctx.lineWidth = 2;
  //ctx.strokeStyle = '#325FA2';
  ctx.arc(0, 0, 25, 0, Math.PI * 2);
  //ctx.arc(pos[0], pos[1], 25, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
  last = new Date();

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
*/

