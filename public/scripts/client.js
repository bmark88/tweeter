/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  loadTweets();
  $('#new-tweet-form').on('submit', onSubmit);

  $('.write-tweet').on('click', onShowTweetInput);
});

let tweetFormHidden = true;
const onShowTweetInput = function () {
  console.log('here')
  if (tweetFormHidden === true) {
    $('#new-tweet-form').slideUp(300);
    tweetFormHidden = false;
  } else {
    $('#new-tweet-form').slideDown(300);
    $("#tweet-text").focus();
    tweetFormHidden = true;
  }
}

const onSubmit = function (event) {
  event.preventDefault();
  const charCount = $('#tweet-text').val().length;
  
  if (charCount !== 0 && charCount <= 140) {
    $.ajax({
      url: '/tweets/',
      type: 'POST',
      data: $(this).serialize(),
      success: (response) => {
        $('.error').hide(200);
        postNewTweet();
      }
    })
  } else {
    $('.error').slideDown(500)
  }
}

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

const postNewTweet = () => {
  $('#tweet-text').val('');
  $('.counter').val('140')
  loadTweets();
}