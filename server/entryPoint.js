var sys = require("sys");
var my_http = require("http");
var path = require("path");
var url = require("url");
var filesys = require("fs");
var cats = require("./controllers/restCat.js");
var MongoClient = require("mongodb").MongoClient;



function serve_file(file_path, response) {
    var full_path = path.join(process.cwd(),file_path);
    //console.log("full filename: " + full_path);
    //once file decided on, serve it
    filesys.exists(full_path,function(exists){
        if(!exists){
            response.writeHeader(404, {"Content-Type": "text/plain"});  
            response.write("404 Not Found\n");  
            response.end();
        }
        else{
            filesys.readFile(full_path, "binary", function(err, file) {  
                 if(err) {  
                     response.writeHeader(500, {"Content-Type": "text/plain"});  
                     response.write(err + "\n");  
                     response.end();  
                 }  
                 else{
                    response.writeHeader(200);  
                    response.write(file, "binary");  
                    response.end();
                }

            });
        }
    }); 
}

function serve_json(json_list, response) {
    response.writeHeader(200);  
    response.write(JSON.stringify(json_list));  
    response.end();
}


//var url = 'mongodb://localhost:27017/test';
//MongoClient.connect(url, function(err, db) {
//  console.log("Connected to server. error: " + err);
//  db.close();
//});




my_http.createServer(function(request,response){
    var parsed_url = url.parse(request.url, true);
    var my_path = parsed_url.pathname;    
    //direct to cat controller
    if(my_path == "/cats/random") {
        console.log("cat controller - random");
        var file_path = cats.random();
        serve_file(file_path, response);
        console.log("cat url: " + file_path);
    } else if(my_path == "/cats/fullList") {
        console.log("cat controller - full list");
        json_list = cats.get_cat_list();
        console.log("json: " + json_list);
        serve_json(json_list, response);
    } else if(my_path == "/cats/breed"){
        var params = parsed_url.query
        console.log("get specific breed: " + params.breed);
        cats.get_cat_pictures(params.breed, serve_json, response);
    } else {
        serve_file(my_path, response);
    }
       
}).listen(8080);
console.log("Server Running on 8080"); 