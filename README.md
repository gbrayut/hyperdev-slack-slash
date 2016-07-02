This provides basic Slack slash command functionality

Steps:
* Create a Slack slash Command at https://yourteam.slack.com/apps/build/custom-integration
* At that site, register your hyperdev app as the URL to use when POSTing. Example https://speckle-foe.hyperdev.space/slack
* Here, put your command's Token in .env (This is used to verify that requests come from Slack)

In Slack you can now use your new /whatever command. It doesn't really do anything right now, but I'll save that for another day

Partially based on Skype bot example at https://hyperdev.com/#!/project/blossom-gambler