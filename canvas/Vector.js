var debug = false;
//functions and classes implemented by cameron @the_adrift
function isNearValue( num = 0, val = 0, delta = 1e-15 ) {
	//checks if a float, num, is within delta of another float, val.
	if ( Math.abs(val - num) <= delta) { return true; };
};

function xor(foo, bar) {
	return ((foo || bar) && !(foo && bar));
};

function mod(num, modulo) {//javascript % is a remainder, not modulo
	let remain = num % modulo;
	return remain >= 0 ? remain : remain + modulo;
};//function borrowed from www.sitecrafting.com/blog/modulus-remainder/

function flatten( a ) {
	//flattens an array of arrays into one array of values
	let b = [...a];
	for (let i = 0; i < b.length; i++) {
		if (Array.isArray(b[i])) {
			b[i] = flatten(b[i]); //repeat recursively for nested arrays
			b = [...b.slice(0, i), ...b[i], ...b.slice(i+1, b.length)];
		};
	};
	return b;
};

class Vector extends Array {
	constructor() {
		//Vectors are one-dimensional arrays
		let args = flatten([...arguments]);
		super(...args);
		
		//Vectors have numeric entries
		for (let i = 0; i < this.length; i ++) {
			this[i] = (isNaN(this[i]))? 0 : +this[i];
		};
	};

	extend(l, fill) {
		//expand by arbitrary number of entries l, optionally filled with fill
		for (let i = 0; i < l; i++) {
			this.push(fill);
		};
		flatten(this);
	};

	magnitude() {
		//returns the Euclidean length of this Vector
		let l = Math.sqrt(Vector.vdot(this, this));
		if (isNearValue(l, 1)) { l = 1; }; //handle 0.99... repeating
		if(debug){console.log(`the magnitude of ${this} is ${l}`)};
		return l;
	};

	scaleBy( scale = 1 ) {
		//scales this Vector by a scalar value, scale.
		if (scale == 1) { return; };
		//do nothing if scale is not a finite number
		if (!isFinite(scale)) { console.log(`${scale} is not a finite value.`);
			return; };

		//multiply the entries of v by scale
		for (let i = 0; i < nth; i++) {
			let before = this[i];
			this[i] = (isNaN(this[i])) ? 0 : this[i] * scale;
			if (debug) {console.log(`${before} * ${scale} = ${this[i]}`)};
		};
	}; //Vector.vscale implemented as an instance method

	normalize() {
		/*normalizes this Vector so that it is a unit Vector, that is,
		it points in the same direction but has a magnitude of 1. */
		this.scaleBy(1/this.magnitude());
	};

	orthoTo( v ) {
		//returns true if this Vector is orthogonal to another Vector, v.
		let ans = (Vector.vdot(this, v) === 0)? true : false ;
		return ans;
	};

	static vadd( vectorA = [0, 0], vectorB = [0, 0] ) {
		/*Adds two vectors a and b by adding their corresponding entries
		The result is a third vector c, such that a + b == c */

		//inputs should be Vectors
		let a = (vectorA instanceof Vector)? vectorA : new Vector(vectorA);
		let b = (vectorB instanceof Vector)? vectorB : new Vector(vectorB);

		//give result as many entries as the Vector with the most entries
		let nth = (a.length > b.length) ? a.length : b.length ;
		let c = new Vector(nth); //creates a zeroed Vector to fill in
		
		for (let i = 0; i < nth; i++) {//loop through the inputs
			//permit inputs with different entry lengths
			if (i >= a.length) { c[i] = b[i] }
			else if (i >= b.length) { c[i] = a[i] }
			else { c[i] = a[i] + b[i] }; //add entries together
			if (debug) {console.log(`${a[i]} + ${b[i]} = ${c[i]}`);};
		};
		return c; //return the computed vector
	};//reimplemented with the Vector class

	static vsub( vectorA = [0, 0], vectorB = [0, 0] ) {
		/*in a triangle of vectors abc, c == a - b
		Subtracts two Vectors a and b such that c points from b to a
		Equivalently, yields a Vector c such that b + c = a */

		//inputs should be Vectors
		let a = (vectorA instanceof Vector)? vectorA : new Vector(vectorA);
		let b = (vectorB instanceof Vector)? vectorB : new Vector(vectorB);
		
		//give result as many entries as the Vector with the most entries
		let nth = (a.length > b.length) ? a.length : b.length ;
		let c = new Vector(nth); //creates a zeroed Vector to fill in
		
		for (let i = 0; i < nth; i++) {//loop through the inputs
			//permit inputs with different entry lengths
			if (i >= a.length) { c[i] = -b[i] }
			else if (i >= b.length) { c[i] = a[i] }
			else { ans[i] = a[i] - b[i] }; //subtract entries, a - b
			if (debug) {console.log(`${a[i]} - ${b[i]} = ${c[i]}`);};
		};		
		return c; //return the computed vector
	};//reimplemented with the Vector class

	static vscale( vec = [0, 0], scale = 1 ) {
		//scales a Vector, vec, by a scalar value, scale.
		//one input should be a Vector
		let v = (vec instanceof Vector) ? vec : new Vector(vec) ;
		
		if (scale == 1) { return v; };

		//do nothing if scale is not a finite number
		if (!isFinite(scale)) { return v; };

		let nth = v.length;
		let ans = new Vector(nth);

		//multiply the entries of v by scale
		for (let i = 0; i < nth; i++) {
			ans[i] = (isNaN(v[i])) ? 0 : v[i] * scale;
			if (debug) {console.log(`${v[i]} * ${scale} = ${ans[i]}`)};
		};
		return ans;
	}; //reimplemented using Vector class

	static vdot( vectorA = [1, 0], vectorB = [0, 1] ) {
		/*returns the scalar product of a and b 
		by adding together the products of their corresponding entries */

		//inputs should be Vectors
		let a = (vectorA instanceof Vector)? vectorA : new Vector(vectorA);
		let b = (vectorB instanceof Vector)? vectorB : new Vector(vectorB);
		
		//permit inputs with different entry lengths
		let nth = (a.length > b.length)? a.length : b.length ;
		
		let ans = 0; //result is a scalar
		for (let i = 0; i < nth; i++) { //sum over the input entries
			ans += (isNaN(a[i]) || isNaN(b[i]))? 0 : a[i] * b[i];
		};
		if (debug) {console.log(`dot product of [${a}] by [${b}] is ${ans}`)};
		return ans;
	}; //reimplemented using Vector class

	static vcross( vectorx = [1, 0, 0], vectory = [0, 1, 0] ) {
		/*finds the cross product, z, of two vectors, x and y. 
		z is itself a vector, and perpendicular to x and y 
		according to the right-hand rule */
		let x = (vectorx instanceof Vector)? vectorx : new Vector(vectorx);
		let y = (vectory instanceof Vector)? vectory : new Vector(vectory);

		//Cross product only for 3-dimensional vectors
		if (x.length != 3 && y.length != 3) { return new Vector(0, 0); };

		let z = new Vector(3);
		for (let i = 0; i < 3; i++) {
			z[i] = ((+x[(i+1)%3])*(+y[(i+2)%3]))-((+x[(i+2)%3])*(+y[(i+1)%3]));
			if (debug) {console.log(`${x[(i+1)%3]} * ${y[(i+2)%3]} - ${x[(i+2)%3]} * ${y[(i+1)%3]} = ${z[i]}`)};
			z[i] = (isNaN(z[i]))? 0 : z[i]; //just in case something snuck in
		};
		return z;
	}; //reimplemented using Vector class

	static isOrtho( vectorA, vectorB ) {
		//checks if two vectors, a and b, are orthogonal to each other.
		let a = (vectorA instanceof Vector)? vectorA : new Vector(vectorA);
		let b = (vectorB instanceof Vector)? vectorB : new Vector(vectorB);
		let ans = a.orthoTo(b);
	}; //instance method orthoTo implemented as a class method.

};

