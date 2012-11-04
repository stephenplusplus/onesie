var Onesie = (function(){
	// Onesie.
	var ActiveOnesie;
	function Onesie (obj) {
		ActiveOnesie = this;
		this.fb = {
			id: obj.fb_id,
			fb_api_key:  obj.fb_api_key
		};
	};
	Onesie.prototype.share = function (obj) {
		var service = obj.service || 'fb';

		Services[service](this);
	};
	Onesie.prototype.Photo = function (obj) {
		return new Photo(obj);
	};
	Onesie.prototype.Event = function (obj) {
		return new Event(obj);
	};

	// Social Services.
	var Services = (function() {
		var connect = {};
		connect.fb = function () {
			var fbInstance = FB;
			var fb_id = ActiveOnesie.fb.fb_id;
			var fb_api_key = ActiveOnesie.fb.fb_api_key;

			return fbInstance;
		};

		var Services = {};
		Services.fb = function (thing) {
			var FB = FB || connect.fb();

			FB.share(thing); // <-- FB's api.
		};

		return Services;
	})();

	// Photo Helper.
	var Photos = {};
	function Photo (obj) {
		Photos[obj.src] = this;
		this.src = obj.src;
	};
	Photo.prototype.share = Onesie.prototype.share.bind(this);
	Photo.prototype.getWidth = function () {
		return 333;
	};
	Photo.prototype.getHeight = function () {
		return 111;
	};
	Photo.prototype.getDimensions = function () {
		var width = this.getWidth(),
			height = this.getHeight();
		return { width: width, height: height };
	};
	Photo.prototype.getFileSize = function () {
		return this;
	};

	return Onesie;
})();

/* instantiate our Onesie. */
var helper = new Onesie({
	fb_id: 'blahblah',
	fb_api_key: 'hblahb'
});

/* let's create a new Photo helper to get additional functionality from just an image path. */
var profilePic = helper.Photo({ src: 'path/to/image.jpg' });
var dimensions = profilePic.getDimensions(); // { width: 333, height: 111 }

profilePic.share({ service: 'fb' });