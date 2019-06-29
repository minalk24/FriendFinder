//---------------------------------------------------------------
//All required packages
//---------------------------------------------------------------
var friends = require("../data/friends");

//---------------------------------------------------------------
//Routing
//---------------------------------------------------------------
module.exports = function(app){

    app.get("/api/friends", function(req, res){
        res.json(friends);
    })

    app.post("/api/friends", function(req, res){
        var newMatchFriend = req.body;

        friends.push(newMatchFriend);
        return res.json(newMatchFriend);
    })
}