var express = require('express'),
    users = require('./routes/users');

var app = express();
/**
 * routes application requests
 * and HTTP METHODS for each function
 */
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);

app.listen(3000);
console.log('Listening on port 3000');