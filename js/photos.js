
// photo class
function Photo(arguments) {
	console.log(arguments.file);
	this.file;
	this.url;
	this.dataurl;


	if(!(arguments.file === undefined)){
		this.file = arguments.file;
	}
	if(!(arguments.url === undefined)) {
		this.url = arguments.url;
	}
}

Photo.prototype.loadFromFile = function(callback) {
	var photo = this;
	var reader = new FileReader();

	reader.onload = function(e){
		photo.dataurl = e.target.result;
		callback();
	}
	
	reader.readAsDataURL(this.file);

}

// resizing the images
Photo.prototype.resize = function(x, y) {
	var img = this;

	var canvas = document.createElement('canvas');
	canvas.width  = x;
	canvas.height = y;
	var context = canvas.getContext("2d");

	var image = new Image;
	image.src = this.dataurl;
	image.onload = function(){
		context.drawImage(image, x, y);
	}
}

//-----------

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(e) {
	var file = e.target.files[0];

	if (file.type.match('image.*')) {

        photo = new Photo({file: file});
		photo.loadFromFile(
			function(){
				photo.resize(50,50);
			}
		);
 	} else {
 		alert('not an image');
 	}
	
}