
class UserService {

  getAllUsers(callback) {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:8080/users");
    req.addEventListener("load", (event) => {
      const res = event.target.response;
      
      // log
      console.log("User list received: " + res);
      
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
    req.open("POST", "http://localhost:8080/users");
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(user));

    // log
    console.log("User post: " + JSON.stringify(user));
  }
}

export default UserService;