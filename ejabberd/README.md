# React Chat

## ejabberd container
- Create a new ejabberd container
  ```shell
  docker run --detach --restart always --name ejabberd \
    --volume $(pwd)/conf/ejabberd.yml:/home/ejabberd/conf/ejabberd.yml \
    --publish 5222:5222 \
    --publish 5280:5280 \
    --publish 5281:5281 \
    --publish 5443:5443 \
    ejabberd/ecs
  ```
- Create an admin user (the ejabberd container must be running)
  ```shell
  docker exec -it ejabberd bin/ejabberdctl register USER localhost PASSWORD
  ```
- Start the ejabberd container
  ```shell
  docker start ejabberd
  ```
- Stop the ejabberd container
  ```shell
  docker stop ejabberd
  ```
