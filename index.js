var express = require('express');
var app = express();



users = [
    {
        username: 'david',
        password: 'password'
    }
]

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));


app.get('/login', function(req, res){

    res.render('login', { })

});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

// 