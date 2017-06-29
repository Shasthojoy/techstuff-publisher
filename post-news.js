const request = require('request');
const env = require('node-env-file');
const path = require('path');
const Twitter = require('twitter');

const workplace = function workplace(title, link) {
  request({
    method: 'POST',
    url: `https://graph.facebook.com/${process.env.TARGET_GROUP}/feed`,
    qs: {
      access_token: process.env.ACCESS_TOKEN,
      message: title,
      link,
    },
  }, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      const postId = JSON.parse(body).id;
      const facebookUrl = `https://dafiti.facebook.com/groups/${postId.replace('_', '/permalink/')}`;
      const payload = {
        channel: '#techstuff',
        username: 'techstuff publisher',
        text: `${title}\n${facebookUrl}`,
        icon_emoji: ':facepalm:',
      };

      console.log(`Published "${title}": ${postId}`);

      request({
        method: 'POST',
        url: process.env.SLACK_URL,
        form: JSON.stringify(payload),
        json: true,
      }, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`Published ${facebookUrl} to slack channel`);
        }
      });
    }
  });
};

const twitter = function twitter(title, link) {
  const twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  twitterClient.post('statuses/update', {
    status: `${title} - ${link} #DFTechNews`,
  }, (error, tweet) => {
    if (error) {
      console.log('error', error);
      return;
    }

    console.log(`Tweet ${tweet} sent`);
  });
};

const post = function post(title, link) {
  const receivers = [
    workplace,
    twitter,
  ];
  for (let i = 0; i < receivers.length; i += 1) {
    receivers[i](title, link);
  }
};

const link = process.argv[2];
let title = process.argv[3];
env(path.join(__dirname, '.env'));

if (typeof title === 'undefined') {
  request({
    method: 'GET',
    url: link,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT x.y; rv:10.0) Gecko/20100101 Firefox/10.0',
    },
  }, (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      const titleRE = /(<\s*title[^>]*>(.*?)<\s*\/\s*title)>/gi;
      const match = titleRE.exec(body);
      if (match && match[2]) {
        title = match[2];
      }
      post(title, link);
    }
  });
} else {
  post(title, link);
}

