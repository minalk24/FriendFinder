//---------------------------------------------------------------
//All required packages
//---------------------------------------------------------------
var friendsData = require("../data/friends");

//---------------------------------------------------------------
//Routing
//---------------------------------------------------------------
module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  app.get("/api/match", function (req, res) {
    var minMatchFactor = Number.MAX_VALUE;
    var matchIndex = -1;

    for (var i = 0; i < friendsData.length - 1; i++) {

      matchFactor =
        Math.abs(friendsData[friendsData.length - 1].answers[0] - friendsData[i].answers[0]) + Math.abs(friendsData[friendsData.length - 1].answers[1] - friendsData[i].answers[1]) + Math.abs(friendsData[friendsData.length - 1].answers[2] - friendsData[i].answers[2]) + Math.abs(friendsData[friendsData.length - 1].answers[3] - friendsData[i].answers[3]) + Math.abs(friendsData[friendsData.length - 1].answers[4] - friendsData[i].answers[4]) + Math.abs(friendsData[friendsData.length - 1].answers[5] - friendsData[i].answers[5]) + Math.abs(friendsData[friendsData.length - 1].answers[6] - friendsData[i].answers[6]) + Math.abs(friendsData[friendsData.length - 1].answers[7] - friendsData[i].answers[7]) + Math.abs(friendsData[friendsData.length - 1].answers[8] - friendsData[i].answers[8]) + Math.abs(friendsData[friendsData.length - 1].answers[9] - friendsData[i].answers[9]);

      //get the minimum matchFactor
      if (minMatchFactor >= matchFactor) {
        minMatchFactor = matchFactor;
        matchIndex = i;
      }
    }
    // console.log(friendsData[matchIndex]);

    res.send(friendsData[matchIndex]);
  });

  app.post("/api/friends", function (req, res) {

    var answersArray = [];

    for (var i = 0; i < req.body.answers.length; i++)
      answersArray.push(parseInt(req.body.answers[i]));

    var newfriend = {
      name: req.body.name,
      photoURL: req.body.photoURL,
      answers: answersArray
    };

    friendsData.push(newfriend);
    res.json(true);
  });

};