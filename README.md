# Techstuff Publisher

Publishes given link to Facebook and the permalink received in the response to slack.

## Setup
1. Create a new [Custom Integration](https://developers.facebook.com/docs/workplace/custom-integrations) app with **Post to Groups** permission.
2. Check out the code and deploy to a server capable of hosting [node.js](https://nodejs.org) applications.
3. Run `npm install` to install the required modules
4. Modify the `.env` file to include the `ACCESS_TOKEN` for your app, the group ID for your `TARGET_GROUP` and a URL for the RSS feed you want to use, and start the node application by running `node clock.js`

