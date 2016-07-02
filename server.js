// init project

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//app.use(bodyParser.json()); //Not needed, Slack POSTs form data
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
  console.log("got a / get request for "+req.url);
  res.send("Instructions should probably go here")
});

app.get("/slack", function(req, res) {
  console.log("got a /stack get request for "+req.url);
  res.send("This is a slack slash endpoint for ssl_check")
});

/* See https://api.slack.com/slash-commands
req.body: 
 { token: '...'
   team_id: 'T03MR',
   team_domain: 'bosun',
   channel_id: 'C1NA2',
   channel_name: 'sandbox',
   user_id: 'U03MT',
   user_name: 'gbrayut',
   command: '/stack',
   text: '123 321',
   response_url: 'https://hooks.slack.com/commands/...' 
 }
Send back text or json (using application/json)
https://api.slack.com/docs/message-formatting#linking_to_urls
https://api.slack.com/docs/message-attachments
https://api.slack.com/docs/messages/builder
*/
app.post("/slack", function(req, res) {
  console.log("got a command: " + req.body.command + " text:" + req.body.text);
  if(req.body.token != process.env.SLACK_SLASH_TOKEN){ //Probably not required, but docs recommend this and will prevent endpoint from being being used nefariously.
    res.send("Invalid token...")
  } else {
    //TODO: parse req.body.command/text/channel/user/etc here and do something with it
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 
        response_type: "in_channel",
        text: "You said:",
        attachments: [
          {
              text:req.body.text
          }
      ]
    }));
  }
});

// listen for requests :)
listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
