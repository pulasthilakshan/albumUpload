
// photo class
function Photo(arguments) {
	this.file;
	this.url;
	this.imageData;
	this.imgWidth;
	this.imgHeight;
	this.fixedHeight = 300;
	this.fixedWidth = 300;


	if(!(arguments.file === undefined)){
		this.file = arguments.file;
	}
	if(!(arguments.url === undefined)) {
		this.url = arguments.url;
	}
	if(!(arguments.imageData === undefined)) {
		this.imageData = arguments.imageData;
	}
}

// load an image
Photo.prototype.loadFromFile = function(callback) {
	var photos = this;
	var reader = new FileReader();

	reader.onload = function(e){

		var canvas = document.createElement('canvas');
		var context = canvas.getContext("2d");

		var image = new Image;
	
		image.onload = function(){
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(image, 0, 0);
			photo.imageData = canvas.toDataURL('Image/jpeg',.7);
			photo.imgWidth = image.width;
			photo.imgHeight = image.height;
			callback();
		}

		image.src = e.target.result;
	}

	reader.readAsDataURL(this.file);

}

// resizing the images
Photo.prototype.resize = function(x, y) {  // callback gets resized image

	// var canvas = document.createElement('canvas');
	// canvas.width  = x;
	// canvas.height = y;
	// var context = canvas.getContext("2d");

	// var image = new Image;
	
	// image.onload = function(){
	// 	context.drawImage(image, 0, 0, canvas.width, canvas.height);
	// 	var imgCanvas = canvas.toDataURL('Image/jpeg',.7);
	// 	callback(new Photo({imageData: imgCanvas}));
	// }

	// image.src = this.imageData;
	//var photo = this;

	var canvas = document.createElement('canvas');

	canvas.width  = x;
	canvas.height = y;

	var context = canvas.getContext("2d");
	
	var img = new Image;

	img.src = this.imageData;
	context.drawImage(img, 0, 0, canvas.width, canvas.height);
	var imgCanvas = canvas.toDataURL('Image/jpeg',.7);
	console.log(imgCanvas);
	return new Photo({imageData: imgCanvas});
}

// Resize the width of a photo
Photo.prototype.resizeX = function() {

	var bestHeight, bestWidth;

	if(this.imgWidth>this.fixedWidth) {
		var ratio = this.fixedWidth/this.imgWidth;
		bestWidth = this.fixedWidth;
		bestHeight = this.imgHeight*ratio;
	} else {
		bestHeight = this.imgHeight;
		bestWidth = this.imgWidth;
	}

	photo.resize(bestWidth, bestHeight);
}

// Resize the height of a photo
Photo.prototype.resizeY = function() {

	var bestHeight, bestWidth;

	if(this.imgHeight>this.fixedHeight) {
		var ratio = this.fixedHeight/this.imgHeight;
		bestHeight = this.fixedHeight;
		bestWidth = this.imgWidth*ratio;
	} else {
		bestHeight = this.imgHeight;
		bestWidth = this.imgWidth;
	}

	photo.resize(bestWidth, bestHeight);
}

// Resize the Long Edge




//-----------

document.getElementById('files').addEventListener('change', handleFileSelect, false);

// function handleFileSelect(e) {
// 	var file = e.target.files[0];

// 	if (file.type.match('image.*')) {

//         photo = new Photo({file: file});
// 		photo.loadFromFile(
// 			function(){
// 				var callback = function(e) {
// 					console.log(e);
// 				}
// 				photo.resize(250,250, callback);
				
// 			}
// 		);
//  	} else {
//  		alert('not an image');
//  	}
	
// }

function handleFileSelect(e) {
	var file = e.target.files[0];

	if (file.type.match('image.*')) {

        photo = new Photo({file: file});
		photo.loadFromFile(
			function(){

				photo.resizeX();
			}
		);
 	} else {
 		alert('not an image');
 	}
	
}