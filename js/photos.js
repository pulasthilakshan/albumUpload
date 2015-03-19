
// photo class
function Photo(arguments) {
	console.log(arguments.file);
	this.file;
	this.url;
	this.data;

	if(!(arguments.file === undefined)){
		this.file = arguments.file;
	}
	if(!(arguments.url === undefined)) {
		this.url = arguments.url;
	}
}

Photo.prototype.loadFromFile = function() {
	var photo = this;
	var reader = new FileReader();

	reader.onload = function(e){
		photo.data = e.target.result;
	}

	reader.readAsDataURL(this.file);
}

//-----------

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(e) {
	var file = e.target.files[0];

	photo = new Photo({file: file});
	photo.loadFromFile();
}