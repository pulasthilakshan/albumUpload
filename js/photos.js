
// photo class
function Photo(arguments) {
	this.file;
	this.url = "http://www.barkteryneexistuje.cz/wp-content/uploads/Cute-Panda-Bears-animals-34915025-2560-1600.jpg";
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
Photo.prototype.resize = function(x, y) {

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
Photo.prototype.resizeLongEdge = function() {

	var bestHeight, bestWidth;

	if(this.imgHeight>this.imgWidth) {
		photo.resizeY();
	} else {
		photo.resizeX();
	}
}

Photo.prototype.loadFromUrl = function(callback) {
	var photos = this;

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

	image.src = this.url;
	console.log(this.url);
	console.log(image.width);
}

//-----------

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(e) {
	var file = e.target.files[0];

	if (file.type.match('image.*')) {

        photo = new Photo({file: file});
		// photo.loadFromFile(
		// 	function(){

		// 		Photo.prototype.resizeLongEdge();
		// 	}
		// );
		photo.loadFromUrl(
			function(){

				photo.prototype.resizeLongEdge();
			}
		);
 	} else {
 		alert('not an image');
 	}
	
}