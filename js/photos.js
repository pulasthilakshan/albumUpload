
// photo class
function Photo(arguments) {
	this.file;
	//this.url = "http://www.barkteryneexistuje.cz/wp-content/uploads/Cute-Panda-Bears-animals-34915025-2560-1600.jpg";
	this.imageData;
	this.imgWidth;
	this.imgHeight;
	this.fixedHeight = 300;
	this.fixedWidth = 300;

	this.status = false;


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
			photos.imageData = canvas.toDataURL('Image/jpeg',.7);
			photos.imgWidth = image.width;
			photos.imgHeight = image.height;
			photos.status = true;
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
	return new Photo({imageData: imgCanvas});
}

// Resize the width of a photo
Photo.prototype.resizeX = function(x) {

	var bestHeight, bestWidth;
	var ratio = x/this.imgWidth;

	if(this.imgWidth>x) {
		bestWidth = x;
		bestHeight = this.imgHeight*ratio;
	} else {
		bestHeight = this.imgHeight*ratio;
		bestWidth = x;
	}

	return new Photo(this.resize(bestWidth, bestHeight));
}

// Resize the height of a photo
Photo.prototype.resizeY = function(y) {

	var bestHeight, bestWidth;
	var ratio = y/this.imgHeight;

	if(this.imgHeight>y) {
		bestHeight = y;
		bestWidth = this.imgWidth*ratio;
	} else {
		bestHeight = y;
		bestWidth = this.imgWidth*ratio;
	}

	return new Photo(this.resize(bestWidth, bestHeight));
}

// Resize the Long Edge
Photo.prototype.resizeLongEdge = function(edge) {

	if(this.imgHeight>this.imgWidth) {
		return new Photo(this.resizeY(edge));
	} else {
		return new Photo(this.resizeX(edge));
	}
}

// upload an image
Photo.prototype.upload = function() {
	
	var saveData = this.resizeLongEdge(400);
	var showData = this.resizeLongEdge(200);
	
	var img = new Image;

	img.src = showData.imageData;
	var images = {pic: img, eleHidden: saveData.imageData};
	return images;
}

// Photo.prototype.loadFromUrl = function(callback) {
// 	var photos = this;

// 	var canvas = document.createElement('canvas');
// 	var context = canvas.getContext("2d");

// 	var image = new Image;

// 	image.onload = function(){
// 		canvas.width = image.width;
// 		canvas.height = image.height;
// 		context.drawImage(image, 0, 0);
// 		photo.imageData = canvas.toDataURL('Image/jpeg',.7);
// 		photo.imgWidth = image.width;
// 		photo.imgHeight = image.height;
// 		callback();
// 	}

// 	image.src = this.url;
// 	console.log(this.url);
// 	console.log(image.width);
// }

//-----------
var photo = [];
document.getElementById('files').addEventListener('change', handleFileSelect, false);


function handleFileSelect(e) {
	console.log(e);
	var file = e.target.files;

	for(var i=0; i < file.length; i++) {
		var f = file[i];
		photo.push(new Photo({file: f}));
	}

	for(p in photo){
		photo[p].loadFromFile(function(){});
	}

	var interval;
	var hiddenValues = [];

	interval = setInterval(function(){
		var loadingStatus = true;
		for (var i = 0; i < photo.length; i++) {
			if(!photo[i].status){
				loadingStatus = false;
			}
		};

		if(loadingStatus){
			for (var i = 0; i < photo.length; i++) {
				clearInterval(interval);
				document.getElementById("displayArea").appendChild(photo[i].upload().pic);
				hiddenValues.push(photo[i].upload().eleHidden);
			}
			document.getElementById("image_data").value = JSON.stringify(hiddenValues);
		}
	},1);

	// for(var i=0, f; f=file[i]; i++) {
	// 	if (f.type.match('image.*')) {

	//         photo.push(new Photo({file: f}));
	//         photo[i].loadFromFile(
	// 			function(){

	// 			}
	// 		);
	//     }
	// }
	// console.log(photo[0].upload().pic);
	// document.getElementById("displayArea").appendChild(photo[0].upload().pic);

	// 		photo[i].loadFromFile(
	// 			function(){

	// 				console.log(i);
	// 				console.log(photo[i-1]);
	// 				document.getElementById("displayArea").appendChild(photo[i-1].upload().pic);
	// 				document.getElementById("hiddenArea").appendChild(photo[i-1].upload().eleHidden);
	// 				// document.createElement("")
	// 			}
	// 		);
	// 		// photo.loadFromUrl(
	// 		// 	function(){

	// 		// 		photo.prototype.resizeLongEdge();
	// 		// 	}
	// 		// );
	//  	} else {
	//  		alert('not an image');
	//  	}
	// }
	
}