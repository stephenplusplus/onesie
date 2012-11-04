var $ee = (function(){
    // $ee.
    var Active$ee;
    function $ee () {
        Active$ee = this;
        this.config = {};
    };
    $ee.prototype.share = function (obj) {
        var service = obj.service || 'fb';

        Services[service](this);
    };
    $ee.prototype.photo = function (obj) {
        return new Photo(obj);
    };
    $ee.prototype.event = function (obj) {
        return new Event(obj);
    };

    // Social Services.
    var Services = (function() {
        var connect = {};
        connect.fb = function () {
            var fbInstance = FB;
            var fb_id = Active$ee.config.fb.id;
            var fb_api_key = Active$ee.config.fb.api_key;

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
    Photo.prototype.share = $ee.prototype.share.bind(this);
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

    return new $ee;
})();

$ee.config.fb = {
    id: 'blahblah',
    api_key: 'blahblah'
};

/* let's create a new Photo helper to get additional functionality from just an image path. */
var profilePic = $ee.photo({ src: 'path/to/image.jpg' });
var dimensions = profilePic.getDimensions(); // { width: 333, height: 111 }

profilePic.share({ service: 'fb' });