var path = require("path");
var exports = module.exports = {};


exports.home = function(req,res){
	res.redirect('/');
}
exports.userhome = function(req,res){
	res.render("/userhome")
}


exports.signup = function(req,res){
	//res.render('signup');
	res.render('/signup');
}

exports.login = function(req,res){
	//res.render('signin');
	res.redirect('/login');
} 
exports.signout = function(req,res){
	console.log("signingout")
	req.session.destroy(function(err){
		res.redirect("/")
		console.log("redirectto home")
	})

}


