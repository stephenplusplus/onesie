window.$33 = (function(win){
    // $33.
    var Active$33;
    function $33 () {
        Active$33 = this;
        this.config = {};
    };
    $33.prototype.share = function (service, callback) {
        service = service || 'fb';

        Services[service].apply(this, [callback]);
    };
    $33.prototype.photo = function (obj) {
        return new Photo(obj);
    };
    $33.prototype.event = function (obj) {
        return new Event(obj);
    };

    // Social Services.
    var Services = (function(){
        var connect = {};
        connect.fb = function () {
            var fbInstance = FB;
            var fb_id = Active$33.config.fb.id;
            var fb_api_key = Active$33.config.fb.api_key;

            return fbInstance;
        };

        function Services () {};
        Services.prototype.fb = function (cb) {
            var FB = win.FB || connect.fb();

            cb();
        };

        return new Services;
    })();

    // Event Helper.
    var Events = {};
    var Event = (function(){
        function Event (obj) {
            Events[obj.title] = this;
            this.time = obj.time;
            this.date = obj.date;
            this.title = obj.title;
            this.desc = obj.desc;
        };
        Event.prototype.share = function (service) {
            var callback = function () {
                // this would be what we want to execute after
                // sharing an event.
            };
            Active$33.share.apply(this, [service, callback]);
        };
        return Event;
    })();

    // Photo Helper.
    var Photos = {};
    var Photo = (function(){
        function Photo (img) {
            Photos[img] = this;
            this.img = img;
        };
        Photo.prototype.share = function (service) {
            var callback = function () {
                // and... this one is what should happen after
                // we share a photo.
            };
            Active$33.share.apply(this, [service, callback]);
        };
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
        return Photo;
    })();

    return new $33;
})(window);

$33.config.fb = {
    id: 'blahblah',
    api_key: 'blahblah'
};

// use a $33 helper for a photo.
var profilePic = $33.photo('path/to/image.jpg');

// one of the helpers: get the dimensions.
profilePic.getDimensions();

// another helper: share the photo to FB.
profilePic.share();

// or a new helper for an event.
var partyTime = $33.event({
    title: 'partay at steve-o\'s!!!',
    desc: 'it gon get crayzay.',
    date: 'now til 2015',
    time: 'all night'
});

partyTime.share();