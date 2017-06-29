# Techstuff Publisher

Publishes given link to Twitter and Facebook Workplace and the FB permalink
received in the response to slack.

## Setup
1. Create a new [Custom Integration](https://developers.facebook.com/docs/workplace/custom-integrations)
   app with **Post to Groups** permission.
2. Check out the code and deploy to a server capable of hosting
   [node.js](https://nodejs.org) applications.
3. Run `npm install` to install the required modules
4. Modify the `.env` file to include the `ACCESS_TOKEN` for your facebook app,
   the facebook group ID for your `TARGET_GROUP`, the `SLACK_URL` for the slack
   techstuff channel and the twitter keys: `TWITTER_CONSUMER_KEY`,
   `TWITTER_CONSUMER_SECRET`, `TWITTER_ACCESS_TOKEN_KEY`,
   `TWITTER_ACCESS_TOKEN_SECRET` respectively.
5. Run `eslint post-news.js` before commit any changes to check for coding-style
   errors.

