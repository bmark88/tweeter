/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetData) => {
  const { name, avatars, handle } = tweetData.user;
  const { text } = tweetData.content;
  const { created_at } = tweetData;

  const currentTweet = `
    <article class="tweet">
      <header>
          <img src="${avatars}" alt="doge" height="125" width="125">
          ${name}
          <p class="right handle">${handle}</p>
      </header>
      <p>${text}</p>
      <footer>
        ${created_at} <span class="tweet-icons"> <span>&#9873</span><span>&#128257</span><span>&#9829</span></span>
      </footer>
    </article>
  `;

  return currentTweet;
};

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  const tweetElements = [];

  for (let tweet of tweets) {
    tweetElements.push(createTweetElement(tweet))
  }

  $('#tweet-container').append(tweetElements.join(''));
}

renderTweets(data);

// on client tweet submission, post the text data to /tweets/ route
$('.new-tweet-form').on('submit', function(event) {
  event.preventDefault();
  $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: $(this).serialize()
    })
    .then(response => {
      console.log(response);
    });
});