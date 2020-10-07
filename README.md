# SimpleChat

As the name suggests, it's a very simple chat webapp.
Using **React** for the client and **Spring MVC** for the backend.

## How it works?

No registration, just give a name and start chat with others.
At the moment the client uses http requests to update its state, so they ping the server at a fixed rate.
No database, everything in memory, messages and users gets deleted once the client stops pinging the server.

## Want to try?

Take a look [**here**](https://whispering-harbor-64839.herokuapp.com)!

## Future

- I will think of a better look.
- I will dig into web sockets!
