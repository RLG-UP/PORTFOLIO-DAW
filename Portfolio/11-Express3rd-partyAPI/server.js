const express = require('express');
const https = require('https');
const http = require('http'); 
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

var key = "117ea9e77ee2d8dfa187d61b6d1ca076";

app.route("/")
    .get((req, res)=>{
    var params = {
 
    };

    res.sendFile(__dirname + "/index.html", params);
    })

    .post(async (req, res)=>{
        var city = req.body.cityName;
        var geoCall = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`;

        var latitude = "";
        var longitude = "";
        var cityTemp = "";


        await http.get(geoCall, (response=>{
            console.log("Got a response from geoCall");
            console.log(response.statusCode);
            var responseContent="";
            response.on("data", (data)=>{
              responseContent += data;
            });
        
            response.on("end", ()=>{
                var jsonResp = JSON.parse
              (responseContent);

              latitude = jsonResp[0].lat;
              longitude = jsonResp[0].lon;
              console.log("Latitude: " + latitude + " || Longitude: " + longitude);


              var tempCall = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;

         

           https.get(tempCall, (response=>{
            console.log("Got a response from tempCall");
            console.log(response.statusCode);
            
            var responseContent="";
            response.on("data", (data)=>{
              responseContent += data;
            });
        
            response.on("end", ()=>{
                var jsonResp = JSON.parse
              (responseContent);

              cityTemp = jsonResp["main"].temp;

              console.log("Temperature: " + cityTemp);

              var params = {
                city,
                cityTemp,
                latitude,
                longitude
              };
              res.render("response", params);

            }).on("error", (e)=>{
              res.send("Error: $(e.message");
            });
          }));


            }).on("error", (e)=>{
              res.send("Error: $(e.message");
            });
          }));

          
         

    });


app.listen(3000, ()=>{
    console.log("Application listening port 3000");
  });
  