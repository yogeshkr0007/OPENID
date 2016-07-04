    var express = require('express');
    var path = require('path');
    var app = express();
    var passport = require('passport'),
        OpenIDStrategy = require('passport-openid').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
      console.log('serializing...');
      done(null, { identifier: user });
    });

    passport.deserializeUser(function(identifier, done) {
      console.log('deserializing...');
      done(null, user.identifier);
    });

    var attrEx = {
      "http://axschema.org/namePerson" : "required",
      "http://axschema.org/namePerson/first": "required",
      "http://axschema.org/namePerson/last": "required",
      "http://axschema.org/contact/email": "required",
      "http://axschema.org/contact/phone": "required",
      "http://axschema.org/contact/phone/additional": "required",
      "http://axschema.org/gender": "required",
      "http://axschema.org/birthdate": "required",
      "http://axschema.org/contact/postaladdress/line1": "required",
      "http://axschema.org/contact/postaladdress/line2": "required",
      "http://axschema.org/contact/city": "required",
      "http://axschema.org/contact/state": "required",
      "http://axschema.org/contact/country": "required",
      "http://axschema.org/contact/postalcode": "required",
      "http://axschema.org/contact/referrer": "required",
      "http://axschema.org/blood_group": "required",
      "http://axschema.org/profile_picture_url": "required",
      "http://axschema.org/mobile_verified": "required",
      "http://axschema.org/account_verified": "required",
      "http://axschema.org/account_verification_referrer": "required",
      "http://axschema.org/totp_enabled": "required",
      "http://axschema.org/language/pref": "required",
      "http://axschema.org/language/pref": "required",
      "http://axschema.org/account_verification_practice_name": "required",
      "http://axschema.org/account_verification_practice_specialty": "required",
      "http://axschema.org/account_verification_practice_phone_number": "required"
    }

    passport.use(new OpenIDStrategy({
        returnURL: 'http://localhost:3000/auth/openid/return',
        realm: 'http://localhost:3000/',
        providerURL: 'https://accounts.practo.com',
        profile: true,
        attributeEx: attrEx
      },
      function(identifier, attributes, done) {
        
        console.log(identifier);
        console.log('auth done');
        console.log(attributes);
        console.log(JSON.stringify(attributes.emails));
        process.nextTick(function() { 
          return done(null, { identifier: identifier })  
         }); 
      }
    ));

    //app.set('views', path.join(__dirname, 'views'));

    app.get('/', function(req, res) {
      res.send('Hello World!');
    });

    app.get('/login', function(req, res) {
      res.sendFile(path.join(__dirname, 'login.html'));
    });

    app.post('/auth/openid', passport.authenticate('openid'));

    app.get('/auth/openid/return',
      passport.authenticate('openid', { successRedirect: '/',
                                        failureRedirect: '/login'})
    );

    app.listen(3000, function() {
      console.log('started!');
    });


