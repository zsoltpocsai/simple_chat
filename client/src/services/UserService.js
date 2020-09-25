
class UserService {

  constructor() {
    this.serverDomain = process.env.REACT_APP_SERVER_DOMAIN;
  }

  getAllUsers(callback) {
    const req = new XMLHttpRequest();
    req.open("GET", this.serverDomain + "/users");
    req.addEventListener("load", (event) => {
      const res = event.target.response;
      
      // log
      //console.log("User list received: " + res);
      
      if (res === "") {
        // when server not responding
      } else {
        const users = JSON.parse(res).filter(user => user != null);
        callback(users);
      }
    });
    req.send();
  }

  postUser(user) {
    if (user == null) return;
    const req = new XMLHttpRequest();
    req.open("POST", this.serverDomain + "/users");
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(user));

    // log
    //console.log("User post: " + JSON.stringify(user));
  }
}

export default UserService;