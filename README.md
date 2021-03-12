# React Chat

Proof of concept XMPP chat with React 

## Run with one command
```shell
docker-compose up -d
```

The application will be available at [http://localhost](http://localhost)

## Access ejabberd administration interface
To access the ejabberd administration interface, you must first create an administrator user. Assuming that the ejabberd container is running and has the name `react-chat_ejabberd_1`, the following command will create an administrator user. Replace `USER` and `PASSWORD` with the administrator's username and password.
```shell
docker exec -it react-chat_ejabberd_1 bin/ejabberdctl register USER localhost PASSWORD
```
The administration interface will be available at [http://localhost:5280/admin](http://localhost:5280/admin)
