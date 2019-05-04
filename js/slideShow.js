function SlideShow(arrowLeft,arrowRight,slideShowContainerID,parentDiv){
	this.leftArrow = document.getElementById(arrowLeft);
	this.rightArrow = document.getElementById(arrowRight);
	this.slideShowContainer = document.getElementById(slideShowContainerID);
	this.slideShowWidth = this.slideShowContainer.scrollWidth;
	this.slideShowHeight = this.slideShowContainer.scrollHeight;
	this.parent = document.getElementById(parentDiv)
	this.parentWidth = this.parent.scrollWidth;
	console.log(this.slideShowWidth);
	if(this.parentWidth > this.slideShowWidth){
		this.slideShowContainer.style.marginLeft = this.centerMargin();
	}
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

	window.onresize = function(event) {
		//console.log("test");
		this.parentWidth = this.parent.scrollWidth;
		this.slideShowWidth = this.slideShowContainer.scrollWidth;
		console.log("parent,slideshow: ",this.parentWidth,this.slideShowWidth);
		let diff = this.parentWidth - this.slideShowWidth;
    	if(diff > 1){
			this.slideShowContainer.style.marginLeft = this.centerMargin();
		}
		else{
			this.slideShowContainer.style.marginLeft = "0px";
		}
	}.bind(this);
};

SlideShow.prototype.centerMargin = function(){
	let leftMargin = (this.parentWidth - this.slideShowWidth 
	) / 2;
	return leftMargin + "px";
};

SlideShow.prototype.leftArrowClicked = function(event) {
	console.log("left clicked: ",event.currentTarget);
};

SlideShow.prototype.rightArrowClicked = function(event) {
	console.log("right clicked: ",event.currentTarget);
};

function initSlideShow(){
	var slideshow = new SlideShow("arrowLeft","arrowRight","slideShowContainer1","parentContainer");
}

window.onload = initSlideShow;