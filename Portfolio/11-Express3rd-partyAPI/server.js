const express = require('express');
const https = require('https');
const http = require('http'); 
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

var key = "INSERT YOUR KEY HERE!!!!";

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
        var icon = "";
        var description = "";

        /*FIRST API CALL - LATITUDE AND LONGITUDE */
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

         
           /*SECOND API CALL - TEMPERATURE*/
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


            var iconCall = `https://samples.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

             /*THIRD API CALL - ICONS and DESCRIPTION*/

              https.get(iconCall, (response=>{
                console.log("Got a response from iconCall");
                console.log(response.statusCode);
                
                var responseContent="";
                response.on("data", (data)=>{
                  responseContent += data;
                });
            
                response.on("end", ()=>{
                    var jsonResp = JSON.parse
                  (responseContent);
    
                  icon = jsonResp["weather"][0].icon;
                  description = jsonResp["weather"][0].description;

                  console.log("Icon: " + icon + " || Description: " + description);
    
                  var params = {
                    city,
                    cityTemp,
                    latitude,
                    longitude,
                    icon,
                    description
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


            }).on("error", (e)=>{
              res.send("Error: $(e.message");
            });
          }));

          
         

    });


app.listen(3000, ()=>{
    console.log("Application listening port 3000");
  });
  