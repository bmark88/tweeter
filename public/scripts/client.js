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

const renderTweets = function (tweets) {
  const tweetElements = [];

  for (let tweet of tweets) {
    tweetElements.push(createTweetElement(tweet))
  }

  // renders the tweets with newest appearing at the top using .reverse()
  $('#tweet-container').append(tweetElements.reverse().join(''));
}

// on client tweet submission, post the text data to /tweets/ route
$('.new-tweet-form').on('submit', function (event) {
  event.preventDefault();
  if ($('textarea').val().length !== 0 && $('textarea').val().length <= 140) {
    $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: $(this).serialize()
      })
      .then(function () {
        console.log(this.data);
      })
  }
});

const loadTweets = () => {
  $.ajax({
      url: '/tweets/',
      type: 'GET',
      dataType: "json"
    })
    .then(response => {
      renderTweets(response);
    })
};

loadTweets();