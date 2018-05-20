
const bCrypt = require('bcrypt-nodejs');

//passing in the passport library and the single user
module.exports = function(passport, user) {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;
    
	//serialize
	passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
	// deserialize user 
	passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } 
            else {
                done(user.errors, null);
            }
            
        });
    });
    
    passport.use('local-signup', new LocalStrategy(
        
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
            
        },function(req, username, password, done) {
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            }
            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
                if (user){
                    return done(null, false, {
                        message: 'That username is already taken'
                    });
                }
                else{
                    console.log(req.body);
                    var userPassword = generateHash(password);
                    var data = {
                        username: username,
                        password: password,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email
                        
                    };
                    User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                        
                    });
                }
                
            });
        }
    ));
    
    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
        
        {// by default, local strategy uses username and password
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            
            var User = user;
            //the isValidPassword function compares the password entered with the bCrypt comparison method since we stored our password with bcrypt.
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            
            User.findOne({
                "username":username
            }).then(function(user) {
                if (!user) {
                    return done(null, false, {
                        message: ' Username does not exist, please signup first'
                    });
                }
                
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                
                var userinfo = user.get();
                return done(null, userinfo);
                
            }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
                
            });
        }
    ));
    
    
}//end all module.export
