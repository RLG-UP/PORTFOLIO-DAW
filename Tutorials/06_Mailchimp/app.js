const express = require("express");
const https = require("https");
require('dotenv').config({ path: './keys.env' });

const app = express();
const apiKey = process.env.apiKey;
const list_id = process.env.list_id;
const server_prefix = "us8";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route for the root path to serve the signup page
app.route("/")
    .get((req, res) => {
        res.sendFile(__dirname + "/signup.html");
    })
    .post((req, res) => {
        const fname = req.body.fname;
        const lname = req.body.lname;
        const email = req.body.email;

        const url = `https://${server_prefix}.api.mailchimp.com/3.0/lists/${list_id}`;

        const options = {
            method: 'POST',
            auth: `user_name:${apiKey}`
        };

        const data = {
            members: [{
                "email_address": email,
                "status": "subscribed",
                "merge_fields": {
                    "FNAME": fname,
                    "LNAME": lname
                }
            }]
        };

        const mailRequest = https.request(url, options, (response) => {
            if (response.statusCode === 200) {
                response.on("data", (data) => {
                    const message = JSON.parse(data);
                    if (message.error_count > 0) {
                        res.sendFile(__dirname + "/failure.html");
                        console.error(message.errors[0].error);
                        console.error(message.errors[0].error_code);
                    } else {
                        res.sendFile(__dirname + "/success.html");
                    }
                });
                response.on("error", (e) => {
                    res.sendFile(__dirname + "/failure.html");
                });
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        });

        mailRequest.write(JSON.stringify(data));
        mailRequest.end();
    });

// Redirect to the root path if failure or success
app.get("/failure", (req, res) => {
    res.redirect("/");
});

app.get("/success", (req, res) => {
    res.redirect("/");
});

// Server listening on port 3000
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
