var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var session = require('express-session');

//app.use(express.cookieParser);


app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat'
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


users = [
    {
        username: 'david',
        password: 'password'
    },
    {
        username: 'joe',
        password: 'qwerty'
    }
]

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));
/*

     #  #####  ####### ######  
#     # #     # #       #     # 
#     # #       #       #     # 
#     #  #####  #####   ######  
#     #       # #       #   #   
#     # #     # #       #    #  
 #####   #####  ####### #     # 



*/


app.get('/', function(req, res){

    user = checkUser(req, res);

    var data = {

        user: user,
        message :'hello there '
    }
    res.render('home',{ data:data });
})

app.get('/login', function(req, res){

    res.render('login', { })

});


app.post('/user/login', function(req, res){

    console.log( req.body.username, req.body.password);


     var validUser = false;

    users.forEach(function(user ,index){
        console.log(user.username);

        if((user.username == req.body.username) && (user.password == req.body.password)){
            console.log('found a valid user');
            validUser = user.username;
        }
    });
    
    if(validUser){
        
        req.session.user = validUser;
        
        res.redirect('/');
    }
    else{
        res.redirect('/login?error=401')
    }

})


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

// 

// Check to see if the user session is active on the user's browser
function checkUser(req,res){

     if (req.session.user) {
        return req.session.user;
    }
    else{
        res.redirect('/login');
        res.end();
    }
}