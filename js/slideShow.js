function SlideShow(arrowLeft,arrowRight){
	this.leftArrow = document.getElementById(arrowLeft);
	this.rightArrow = document.getElementById(arrowRight);
	this.initEventListeners();
}

SlideShow.prototype.initEventListeners = function() {
	this.leftArrow.addEventListener("click",function(e){
		this.leftArrowClicked(e);
	}.bind(this),false);

	this.rightArrow.addEventListener("click",function(e){
		this.rightArrowClicked(e);
	}.bind(this),false);
};

SlideShow.prototype.leftArrowClicked = function(event) {
	console.log("left clicked: ",event.currentTarget);
};

SlideShow.prototype.rightArrowClicked = function(event) {
	console.log("right clicked: ",event.currentTarget);
};

function initSlideShow(){
	var slideshow = new SlideShow("arrowLeft","arrowRight");
}

window.onload = initSlideShow;