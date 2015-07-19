//restCat
module.exports = {
    //create cat list
    get_cat_list: function() {
        var json_list = {"cats": [
                    {
                        "thumb": random(),
                        "breed": "ragdoll"
                    },
                    {
                        "thumb": random(),
                        "breed": "persian"
                    },
                    {
                        "thumb": random(),
                        "breed": "maine coon"
                    },
                    {
                        "thumb": random(),
                        "breed": "american shorthair"
                    },
                    {
                        "thumb": random(),
                        "breed": "bengal"
                    },
                    {
                        "thumb": random(),
                        "breed": "scottish fold"
                    },
                    {
                        "thumb": random(),
                        "breed": "birman"
                    },
                    {
                        "thumb": random(),
                        "breed": "siberian"
                    }
                ]};
        return json_list;
    },
    get_cat_pictures: function(breed, callback, response) {
        var Flickr = require("flickrapi"),
            flickrOptions = {
              api_key: "3ad9782d92105b83694a51d3f4f5a799",
              secret: "3ec692038f39a218"
            };

        Flickr.tokenOnly(flickrOptions, function(error, flickr) {
          // we can now use "flickr" as our API object,
          // but we can only call public methods and access public data
            
            var search_term = breed+"+cat";
            console.log("searching: " + search_term);

            flickr.photos.search({
                text: search_term,
                extras: "url_z",
                license: "1",   //creative commons. modifications allowed is 2
                media: "photos",
                limit: "50"
            }, function(err, result) {
                if(err) { console.log("error: " + err); }
                if (result.photos.photo.length > 0) {
                    var url_list = get_flickr_urls(5,result.photos.photo);
                } else {
                    console.log("not enough results");
                    callback([], response);
                }
                console.log(url_list);
                callback(url_list, response);
            });
        });
        
    }
};

//serve a cat
function random() {
        var number = Math.ceil((Math.random() * 10));
        var catUrl = "/contents/images/cat_" + number + ".jpg";
        return catUrl;
    }


function get_flickr_urls(number, photos) {
    var url_list = [];
    var rand_list = [];
    var base_url = "http://www.flickr.com/photos/";
    console.log("photos length: " + photos.length);
    var rand = Math.ceil((Math.random() * photos.length)) - 1;
    
    for(var i = 0; i < number; i++) {
        while ((rand_list.indexOf(rand) != -1) || (photos[rand].url_z == undefined)) {
            rand = Math.ceil((Math.random() * photos.length)) - 1;
        }
        console.log("index: " + rand + ", array obj: " + JSON.stringify(photos[rand]));
        url = base_url + photos[rand].owner + "/" + photos[rand].id;
        url_list.push({
                        pic:photos[rand].url_z,
                        title:photos[rand].title,
                        url:url
                      });
        rand_list.push(rand);
    }
    return url_list;
}