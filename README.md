# LDAP USERS

## Setup

Clone this repo to disk, then run Docker containers

```
sudo sh .bin/start.sh
```

and setup database

```
sudo docker exec sinatra-app rake db:setup
```

and open the App

```
open http://localhost:3000
```
