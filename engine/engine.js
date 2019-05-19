//class used to setup all initial css, html, and data values
function Engine(options){
	this.options = options;
	this.slideShowStyles = document.styleSheets[0].cssRules;
	console.log(this.slideShowStyles);
}

Engine.prototype.initEngine = function() {
	
};

Engine.prototype.initCSS = function() {
	
};

let engine = new Engine(optionData);