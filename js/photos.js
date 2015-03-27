
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


	// return new Photo(this.resize(bestWidth, bestHeight));
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
Photo.prototype.upload = function(url,callback) {

	var image = this.imageData;
    var headers = 'image=' + image;

    var xmlHttp = new XMLHttpRequest(); 
    xmlHttp.onreadystatechange = function(){
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open( "POST", url, true );
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.send(headers);
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
document.getElementById('one_file').addEventListener('change', handleOneFile, false);
document.getElementById('files').addEventListener('change', handleFileSelect, false);
document.getElementById('upload_pic').addEventListener('click', uploadImages, false);


function handleFileSelect(e) {
	document.getElementById("displayArea2").innerHTML = "";
	var file = e.target.files;

	for(var i=0; i < file.length; i++) {
		var f = file[i];
		photo.push(new Photo({file: f}));
	}

	for(p in photo){
		photo[p].loadFromFile(function(){});
	}

	var interval;

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
				var resizedImg = photo[i].resizeLongEdge(300);
				//resizedImg.upload('/', resizedImg.responseCheck);
				var img_thumb = document.createElement("IMG");
				img_thumb.src = resizedImg.imageData;
				document.getElementById("displayArea2").appendChild(img_thumb);
			}
		}
	},1);
}

function uploadImages() {
	var interval;

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
				var resizedImg = photo[i].resizeLongEdge(500);
				resizedImg.upload('test.php', resizedImg.responseCheck);
			}
		}
	},1);
}

Photo.prototype.responseCheck = function (res) {
	var img = this;
	if(res == 'Failed') {
		console.log('hello');
	}
}


function handleOneFile(e) {
	document.getElementById("displayArea").innerHTML = "";
	photo = [];
	var hiddenValues;
	var file = e.target.files;

	for(var i=0; i < file.length; i++) {
		var f = file[i];
		photo.push(new Photo({file: f}));
	}

	for(p in photo){
		photo[p].loadFromFile(function(){});
	}

	var interval;

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
				var resizedImg = photo[i].resizeLongEdge(500);
				resizedImg.upload('/', resizedImg.responseCheck);
				var img_thumb = document.createElement("IMG");
				img_thumb.src = resizedImg.imageData;
				document.getElementById("displayArea1").appendChild(img_thumb);
			}
		}
	},1);
}
