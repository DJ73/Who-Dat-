var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
const { response } = require('../app');
require('dotenv').config();

var client = new Twitter({
  consumer_key: process.env.API_SECRET,
  consumer_secret: process.env.API_SECRET_TOKEN,
  bearer_token: process.env.BEARER_TOKEN
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:username', function(req, res, next) {
  // res.write('user [' + req.params.username + '] received\n\n');

  url_path = 'followers/list.json?&screen_name=' + req.params.username + '&count=200&include_user_entities=false';

  function follower_callback(error, tweets, response) {
    if (error) {
      console.log(error);
    }
    // TODO: Add cursor support
    cursor = -1;
    url_with_cursor = url_path + '&cursor=' + cursor;

    all_followers = [];

    response_dictionary = JSON.parse(response.body)
    users = response_dictionary.users;
    // console.log(typeof(users));
    // console.log(Object.keys(users["0"]));
    count = 1
    res.write("User [" + req.params.username + "] has the following followers\n\n")
    for (x in users) {
      console.log(count + ") " + users[x]["name"]);
      res.write(('0000' + count).slice(-4) + " " + users[x]["name"] + '\n');
      count += 1;
      // res.write(users[x]["name"] + " <" + users[x]["screen_name"] + ">\n")
      all_followers.push(users[x]);
    }
    res.write("\n" + (count-1) + " followers found\n");
    res.end();
  }
  
  client.get(url_path, follower_callback);

});

module.exports = router;
