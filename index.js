const admin = require('firebase-admin');
const serviceAccount = require('./servicekey.json');
const express = require("express")
const cors = require("cors");
const { json } = require('express');

let app = express()
app.use(express.json())
app.use(cors())

let port = process.env.PORT || 5000



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});





app.post("/api/sendNotification", (req, res) => {
    const message = {
        notification: {
            title: req.body.notification.title,
            body: req.body.notification.body
        },
        topic: 'all_users'
    };
    console.log(req.body, '===>Body');
    admin.messaging().send(message)
        .then((response) => {
            res.json({
                "message": "Successfully sent",
                "status": true
            })
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            res.json({
                "message": "notification send unsuccessfull",
                "status": false,
                "error": error
            })
            console.log('Error sending message:', error);
        });
})

app.listen(port, () => console.log("server runnings"))
