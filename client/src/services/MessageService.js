
class MessageService {

  getAllMessagesOfUser(user, callback) {
    const userId = user.id;
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:8080/messages/" + userId);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener("load", (event) => {
      const body = event.target.response;
      callback(JSON.parse(body));

      // log
      console.log("Messages received: " + body);
    });
    req.send();
  }

  postMessage(message) {
    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8080/messages");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(message));

    // log
    console.log("Message sent: " + JSON.stringify(message));
  }

  updateMessage(message) {
    const req = new XMLHttpRequest();
    req.open("PUT", "http://localhost:8080/messages");
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(message));
  
    // log
    console.log("Message update: " + JSON.stringify(message));
  }
}

export default MessageService;