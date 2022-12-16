const express = require('express');
const app = express();
const mongoose = require('mongoose');
var firebase = require("firebase-admin");
const Token = require('./Token');
var cors = require('cors')
app.use(cors())
app.use(express.json())

app.post('/saveToken', async (req, res) => {
    console.log(req.body.token);
    // const token = await Token.create({
    //     token : req.body.token
    // });
    // res.status(201).json({
    //     "message" : "token saved successfully."
    // });
});

app.get('/pushNotification', async (req, res) => {  
    var serviceAccount = await require("./test-a083a-firebase-adminsdk-3nmq9-f23a16761d.json");
    if (!firebase.apps.length) {
        var temp = await firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount)
        })
    }
    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };
    var message_notification = {
        notification: {
            title: "Demo Subject",
            body: "Demo Message lorem30",
            // sound: "notification"
        },
        data: {
            title: "this is subject",
            desc: "this is message",
            // type,
            // sound: "notification",
            // query_id
        }
    };
    firebase.messaging().sendToDevice(["de4yOytvSrX7rBoZwN0gOy:APA91bE_RAZ4_n4q9B5-koipSDbUBKj2_lhPDwKJXkjfNtVba5QG9V2gDXaFgN3Geb6xILBcKKT7O9EZ_GB_Ckt3oV9JHumpUCRxJ8-AN7LhrdcHTrw8LDEOXUjfdguIXYK8Muq7lvnM", "de4yOytvSrX7rBoZwN0gOy:APA91bE_RAZ4_n4q9B5-koipSDbUBKj2_lhPDwKJXkjfNtVba5QG9V2gDXaFgN3Geb6xILBcKKT7O9EZ_GB_Ckt3oV9JHumpUCRxJ8-AN7LhrdcHTrw8LDEOXUjfdguIXYK8Muq7lvnM"], message_notification, notification_options)
        .then(response => {
            console.log("success", response);
            return true;
        })
        .catch(error => {
            console.log("error", error);
            return false
    });

    res.send("okay");


});

app.listen(8000, () => {
    console.log('Server started at 8000');
    mongoose.set("strictQuery", false);
    mongoose.connect(`mongodb+srv://aman:aman@ecommerce.ttrahjr.mongodb.net/?retryWrites=true&w=majority
    JWT_SECRET=skjdbfkbdskvowuihffnkKSDVKBBONKSJKJDLOWNRGLKNVRIONRONKR`).then((data) => {
        console.log("DB connected successfully");
    });
});