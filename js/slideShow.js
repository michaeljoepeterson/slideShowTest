function SlideShow(arrowLeft,arrowRight,slideShowContainerID,parentDiv,imageClass,maxWidth){
	this.positionCalculating = false;
	this.leftArrow = document.getElementById(arrowLeft);
	this.rightArrow = document.getElementById(arrowRight);
	this.slideShowContainer = document.getElementById(slideShowContainerID);
	//will get them in the correct order
	this.slideShowImages = document.getElementsByClassName(imageClass);
	this.slideShowWidth = this.slideShowContainer.clientWidth;
	this.slideShowHeight = this.slideShowContainer.scrollHeight;
	this.parent = document.getElementById(parentDiv);
	this.parentWidth = this.parent.scrollWidth;
	this.maxWidth = maxWidth;
	//console.log(this.slideShowWidth);
	if(this.parentWidth > this.slideShowWidth){
		this.slideShowContainer.style.marginLeft = this.centerMargin();
	}
	this.initEventListeners();
	this.initImagePositions();
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
		this.handleCenterReize();
		this.handlePositionReize();

	}.bind(this);
};

SlideShow.prototype.handlePositionReize = function(){
	if(this.parentWidth < this.maxWidth && !this.positionCalculating){
		this.slideShowWidth = this.parentWidth;
		this.positionCalculating = true;
		setTimeout(function(){
			
			this.initImagePositions();
			console.log("done")
		}.bind(this),1100);
	}
	else if (this.parentWidth >= this.maxWidth){
		this.initImagePositions();
	}
}

SlideShow.prototype.handleCenterReize = function(){
	//console.log("test");
		this.parentWidth = this.parent.scrollWidth;
		this.slideShowWidth = this.slideShowContainer.scrollWidth;
		if(this.slideShowWidth > this.maxWidth){
			this.slideShowWidth = this.maxWidth;
		}
		//console.log("parent,slideshow: ",this.parentWidth,this.slideShowWidth);
		let diff = this.parentWidth - this.slideShowWidth;
    	if(diff > 1){
			this.slideShowContainer.style.marginLeft = this.centerMargin();
		}
		else{
			this.slideShowContainer.style.marginLeft = "0px";
		}
}

SlideShow.prototype.initImagePositions = function(){
	for(let i = 0;i < this.slideShowImages.length;i++){
		console.log(this.slideShowImages[i],i * this.slideShowWidth);
		this.slideShowImages[i].style.transform = "translateX(" + this.slideShowWidth * i + "px)";
		if(i !== 0){
			let heightString = this.slideShowImages[i].height;
			let widthtString = this.slideShowImages[i].width;
			console.log(widthtString,heightString);
		}
	}
	this.positionCalculating = false;
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
	var slideshow = new SlideShow("arrowLeft","arrowRight","slideShowContainer1","parentContainer","slideShowImage",1000);
}

window.onload = initSlideShow;