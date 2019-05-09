function SlideShow(arrowLeft,arrowRight,slideShowContainerID,parentDiv,imageClass,maxWidth){
	this.positionCalculating = false;
	this.leftArrow = document.getElementById(arrowLeft);
	this.rightArrow = document.getElementById(arrowRight);
	this.slideShowContainer = document.getElementById(slideShowContainerID);
	//will get them in the correct order
	this.slideShowImages = document.getElementsByClassName(imageClass);
	this.activeImageIndex = 0;
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
		this.handleCenterResize();
		this.handlePositionResize();

	}.bind(this);
};

SlideShow.prototype.handlePositionResize = function(){
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

SlideShow.prototype.handleCenterResize = function(){
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
};

SlideShow.prototype.getMaxDimensions = function(){
	for(let i = 0;i < this.slideShowImages.length;i++){
		if(this.slideShowImages[i].classList.contains("firstImage")){
			return [this.slideShowImages[i].width,this.slideShowImages[i].height];
		}
	}
}

SlideShow.prototype.getImageCenter = function(width,height){
	return {top:height/4,left:width/4};
}

SlideShow.prototype.initImagePositions = function(){
	let activeImageDimensions = this.getMaxDimensions();
	let activeImageWidth = activeImageDimensions[0];
	let activeImageHeight = activeImageDimensions[1];
	//need to set top/left position to center /4
	for(let i = 0;i < this.slideShowImages.length;i++){
		
		//let imgHeight = this.slideShowImages[i].height;
		//let imgWidth = this.slideShowImages[i].width;
		console.log(this.slideShowImages[i],i * activeImageWidth);
		this.slideShowImages[i].style.transform = "translateX(" + activeImageWidth * i + "px)";
	}
	this.positionCalculating = false;
};

SlideShow.prototype.centerMargin = function(){
	let leftMargin = (this.parentWidth - this.slideShowWidth 
	) / 2;
	return leftMargin + "px";
};

SlideShow.prototype.resizeImage = function(center){
	let promise = new Promise((resolve,reject) => {
		setTimeout(function(){
			this.slideShowImages[this.activeImageIndex].style.top = center.top + "px";
			this.slideShowImages[this.activeImageIndex].style.left = center.left +"px";
			console.log("center image");
			this.activeImageIndex += 1;

			resolve("yup");
		}.bind(this),1100);
	});

	return promise;
}

SlideShow.prototype.leftArrowClicked = function(event) {
	console.log("left clicked: ",event.currentTarget);
};
//may need a variable to stop resize calcs while slideshow happenning
//then return promise and call resize
SlideShow.prototype.rightArrowClicked = function(event) {
	console.log("right clicked: ",event.currentTarget);
	if(this.activeImageIndex === this.slideShowImages.length - 1){
		return;
	}
	else{
		let activeImageDimensions = this.getMaxDimensions();
		let activeImageWidth = activeImageDimensions[0];
		let activeImageHeight = activeImageDimensions[1];
		this.slideShowImages[this.activeImageIndex].classList.remove("firstImage");
		let center = this.getImageCenter(activeImageWidth,activeImageHeight);
		return this.resizeImage(center)

		.then((data) => {
			console.log("done resizing image",data);
		})
	}
};

function initSlideShow(){
	var slideshow = new SlideShow("arrowLeft","arrowRight","slideShowContainer1","parentContainer","slideShowImage",1000);
}

window.onload = initSlideShow;