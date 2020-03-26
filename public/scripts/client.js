/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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
      <p>${escape(text)}</p>
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
    $('#tweet-container').html(tweetElements.reverse().join(''));
  }

  const loadTweets = () => {
    $.ajax({
      url: '/tweets/',
      type: 'GET',
      dataType: "json",
      success: (response) => {
        renderTweets(response);
      }
    })
  }

  loadTweets();
  // on client tweet submission, post the text data to /tweets/ route
  $('.new-tweet-form').submit(function (event) {
    event.preventDefault();
    if ($('#tweet-text').val().length !== 0 && $('#tweet-text').val().length <= 140) {
      $.ajax({
        url: '/tweets/',
        type: 'POST',
        data: $(this).serialize(),
        success: (response) => {
          // removes this error-exists class if there was an error existing previously
          $('.error').removeClass('error-exists');
          loadTweets();
        }
      })
    } else {
        // displays an error message to input a correct char limit length
      $('.error')
        .addClass('error-exists')
        .slideDown(1000)
    }
  });
  
});