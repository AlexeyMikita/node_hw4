const passport = require('passport');
const jsonWebToken = require('jsonwebtoken');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const users = require('./controllers/users');
const products = require('./controllers/products');
const jwtAuth = require('./middlewares/jwt-auth');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;


const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use((req, res, next) => {
    req.parsedCookies = req.cookies;
    console.log(req.parsedCookies);
    next();
});
  
app.use((req, res, next) => {
    req.parsedQuery = req.query;
    console.log(req.parsedQuery);
    next();
});

//app.use(['/api/products', '/api/users'], jwtAuth);

const user = {
    id: '123456',
    username: 'Alex',
    email: 'alex@test.com',
    password: 'spassword',
};

app.post('/auth',
    (req, res) => {
        let authLocal = 'Basic ' + Buffer.from(user.username + ':' + user.password).toString('base64');
        let authReq = req.headers['authorization'];
        console.log('Local auth' + authLocal);
        console.log('Req auth' + authReq);
        if (authLocal === authReq) {
            res.send(JSON.stringify(
                {
                    code: 200,
                    message: 'OK',
                    data: {
                        user: {
                            email: user.email,
                            username: user.username
                        },
                        token: jsonWebToken.sign({ "data" : user.email }, 'very_secret', { expiresIn: '1h' })
                    }
                }
            ));
        } else {
            res.send(JSON.stringify(
                {
                    code: 404,
                    message: 'Not Found',
                    data: {
                        errorMessage: 'No such user'
                    }
                }
            ));
        }
    },
);

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

passport.use('local', new LocalStrategy(
    {
        usernameField: 'login',
        passwordField: 'password'
    },
    (username, password, done) => {
        console.log('passport');
      (user.userName !== username
        && user.password !== password)
        ? done(null, false, 'invalid credentials')
        : done(null, user);
    },
));

passport.use(new FacebookStrategy (
    {
        clientID: '2258272314415413',
        clientSecret: 'b44570a4f128c3360cdc44eff3480f43',
        callbackURL: 'http://localhost:3000/passport-facebook/callback'
    }, function(req, accessToken, refreshToken, profile, done) {
        console.log(profile);

        return done(null, profile);
    }
));


app.get('/passport-facebook', passport.authenticate('facebook'));

app.get('/passport-facebook/callback',
    passport.authenticate('facebook',
        {
            successRedirect: '/auth/passport-success',
            failureRedirect: '/auth/passport-error'
        })
);

passport.use(new GoogleStrategy(
    {
        clientID: '615674921520-da4rfngjc23p754ucg14keqd784e6m7j.apps.googleusercontent.com',
        clientSecret: 'ateDh1pLVHp4CFBWHqFZS1OB',
        callbackURL: 'http://localhost:3000/passport-google/callback',
        passReqToCallback: true
    }, function(req, accessToken, refreshToken, profile, done) {
        console.log(profile);

        return done(null, profile);
    }
));

app.get('/passport-google', passport.authenticate('google', { scope: ['email profile'] }));

app.get('/passport-google/callback', 
    passport.authenticate('google', 
        {
            successRedirect: '/auth/passport-success',
            failureRedirect: '/auth/passport-error'
        })
);


app.post(
    '/auth/local',
    passport.authenticate('local', { session: false }),
    (req, res) => {
      res.send('authenticated');
    },
);

  
app.get('/', function (req, res) {
    res.send('Hello World!');
    res.end();
});

app.get('/api/users', users.all);

app.get('/api/products', products.all);
app.get('/api/products/:id', products.getProductById);
app.get('/api/products/:id/reviews', products.getReviewsByProductId);
app.post('/api/products', products.addNewProduct);




module.exports = app;
