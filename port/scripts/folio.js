var buffer = new Array(12);
var current = 0;
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var image = document.getElementById("disp");

function advance(n) {
	n = isFinite(n)? n: 0;
	console.log(`advance by ${n}`);
	current = +current;
	current = (current + n) % buffer.length;
	current = (current < 0)? buffer.length + current : current;
	current = ''+current;
	current = (current.length > 1)? current : `0${current}`;
	console.log(current);
	image.src = `${current}.png`;
};

function goPrev() {
	advance(-1);
};

function goNext() {
	advance(1);
};

prev.addEventListener("click", goPrev, false);
next.addEventListener("click", goNext, false);
disp.addEventListener("click", goNext, false);
