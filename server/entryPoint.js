var sys = require("sys");
var my_http = require("http");
var path = require("path");
var url = require("url");
var filesys = require("fs");

//serve a cat
function random_cat() {
    var number = Math.ceil((Math.random() * 10));
    var catUrl = "/contents/images/cat_" + number + ".jpg";
    return catUrl;
}

//create cat list
function get_cat_list() {
    var json_list = {"cats": [
                {
                    "thumb": random_cat(),
                    "breed": "ragdoll"
                },
                {
                    "thumb": random_cat(),
                    "breed": "persian"
                },
                {
                    "thumb": random_cat(),
                    "breed": "cerval"
                }
            ]};
    return json_list;
}

function serve_file(file_path, response) {
    var full_path = path.join(process.cwd(),file_path);
    sys.puts("full filename: " + full_path);
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







my_http.createServer(function(request,response){
    var my_path = url.parse(request.url).pathname;    
    //direct to cat controller
    if(my_path == "/cats/random") {
        sys.puts("cat controller - random");
        var file_path = random_cat();
        serve_file(file_path, response);
        sys.puts("cat url: " + file_path);
    } else if(my_path == "/cats/fullList") {
        sys.puts("cat controller - full list");
        json_list = get_cat_list();
        sys.puts("json: " + json_list);
        serve_json(json_list, response);
    } else {
        serve_file(my_path, response);
    }
       
}).listen(8080);
sys.puts("Server Running on 8080"); 