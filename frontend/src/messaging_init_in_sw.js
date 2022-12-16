import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyAsugC2S69PXvosO56CwRzDFy5xbnMTb-A",
  authDomain: "test-a083a.firebaseapp.com",
  projectId: "test-a083a",
  storageBucket: "test-a083a.appspot.com",
  messagingSenderId: "101642171307",
  appId: "1:101642171307:web:d1397a0b3c36d613e018ee",
  measurementId: "G-SVKQ2GBSB5"
};

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BEW6vfERanbQHTrunc35RFT8_qY3IyX7qFv0FcGCPruheRJ8y5ShlEUqK94jfck-WJNCqrgxGh4eubYvWUQSv2w",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
          axios
            .post('http://localhost:8000/saveToken', {
              token : currentToken
            })
            .then((response) => {
              console.log(response);
            });
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();
