function SlideShow(arrowLeft,arrowRight,slideShowContainerID){
	this.leftArrow = document.getElementById(arrowLeft);
	this.rightArrow = document.getElementById(arrowRight);
	this.slideShowContainer = document.getElementById(slideShowContainerID);
	this.slideShowWidth = this.slideShowContainer.scrollWidth;
	this.slideShowHeight = this.slideShowContainer.scrollHeight;
	console.log(this.slideShowWidth);
	this.initEventListeners();
}

//if keep 1000px width then can do a resize calc/init calc
//max-width - center div container width / 2 = margin left
//could do that for all sizes? resize event on a timer?

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
	var slideshow = new SlideShow("arrowLeft","arrowRight","slideShowContainer1");
}

window.onload = initSlideShow;