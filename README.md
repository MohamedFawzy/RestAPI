RestAPI
=======

Hi,
rest api based on nodejs (expressjs) framework and mongodb
1-install nodejs from nodejs.org
2-install express  cd RESTAPI/
  npm install
3- install mongodb driver npm install mongodb  
4- run server node server.js
5- test api using  browser http://localhost:3000/users/
6- test api using curl

curl -i -X GET http://localhost:3000/users - fetchAll
curl -i -X GET http://localhost:3000/id - fetchbyId
curl -i -x POST curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Foo0ozy", "year": "2009"}' 
http://localhost:3000/users - Add new user

curl -i -X PUT -H 'Content-Type: application/json' -d '{"name": "NewUserUpdated", "year": "2010"}' 
http://localhost:3000/users/id -- update user with id and data sent as json

curl -i -X DELETE http://localhost:3000/users/id -- delete user


