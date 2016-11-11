const ctx = require("axel");

//const brushes = ".░▒▓█";
// const brushes = ".,:;!|";
const brushes = ".:oO0";
// const brushes = " ";

const Rain = function() {
	this.drops = [];
	this.time = 0;
	ctx.clear();
}

Rain.prototype.createDrop = function() {
	var dx = Math.round(ctx.cols * Math.random());
	var dy = Math.round(ctx.rows * Math.random() * .45);
	var dir = 0;
	var drop = new Drop(dx, dy);
	this.drops.push(drop);
}

Rain.prototype.render = function() {
	if (Math.random() < this.time / 1000) {
		this.createDrop();
	}

	for (var i = 0; i < this.drops.length; i++) {
		var drop = this.drops[i];
		if (drop.render() >= ctx.rows) {
			this.drops.splice(i, 1);
		};
	}

	this.time++;
}

const Drop = function($x, $y) {
	this.x = $x;
	this.y = $y;
	this.initY = $y;
}

Drop.prototype.nextBrush = function(n) {
	return brushes[Math.min(parseInt(n*brushes.length), brushes.length - 1)];
}

Drop.prototype.render = function() {
	if (Math.random() > .01) {
		//return;
	}

	var b = Math.max(.2, (this.y - this.initY) / ctx.rows) + (Math.random() * .1);

	ctx.bg(0,0,0);
	ctx.fg(
		parseInt(b * 64),
		parseInt(b * 200),
		parseInt(b * 255)
	);
  ctx.brush = this.nextBrush((this.y - this.initY + 3) / ctx.rows);
	ctx.point(this.x, this.y);
	ctx.cursor.restore();

	this.y += 1;

	return this.y;
}

var rain = new Rain();

setInterval(rain.render.bind(rain), 20);


