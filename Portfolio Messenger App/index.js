const firebaseConfig = {
  apiKey: "AIzaSyD9_0YZ-asWbj4l-PvC_DPv6QIO6Ec42AQ",
  authDomain: "messenger-app-830cb.firebaseapp.com",
  databaseURL: "https://messenger-app-830cb-default-rtdb.firebaseio.com",
  projectId: "messenger-app-830cb",
  storageBucket: "messenger-app-830cb.appspot.com",
  messagingSenderId: "43379018483",
  appId: "1:43379018483:web:f95ce443ea17e3fa50c586"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
const db = firebase.database();

// Prompt User to Login
const username = prompt("Insert Name: ");

// Listen for when Send Button is Clicked, and Trigger a Function to be Executed
document.getElementById("message-form").addEventListener("submit", sendMessage);

// Send Messages to the Chatroom
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// Reference the collection
const fetchChat = db.ref("messages/");

// Render New Text Message onto Page
fetchChat.on("child_added", function(snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
