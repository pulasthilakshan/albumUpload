
// photo class
function Photo(arguments) {
	this.file;
	this.url;
	this.imageData;



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

Photo.prototype.loadFromFile = function(callback) {
	var photo = this;
	var reader = new FileReader();

	reader.onload = function(e){
		photo.imageData = e.target.result;
		callback();
	}
	
	reader.readAsDataURL(this.file);
}

// resizing the images
Photo.prototype.resize = function(x, y, callback) {  // callback gets resized image

	var canvas = document.createElement('canvas');
	canvas.width  = x;
	canvas.height = y;
	var context = canvas.getContext("2d");

	var image = new Image;
	
	image.onload = function(){
		context.drawImage(image, 0, 0, canvas.width, canvas.height);
		var imgCanvas = canvas.toDataURL('Image/jpeg',.7);
		callback(new Photo({imageData: imgCanvas}));
	}

	image.src = this.imageData;
}

// upload images
Photo.prototype.upload = function() {

}

//-----------

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(e) {
	var file = e.target.files[0];

	if (file.type.match('image.*')) {

        photo = new Photo({file: file});
		photo.loadFromFile(
			function(){
				var callback = function(e) {}
				photo.resize(250,250, callback);
			}
		);
 	} else {
 		alert('not an image');
 	}
	
}