/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  loadTweets();
  $('.write-tweet').on('click', onShowTweetInput);
  $('#new-tweet-form').on('submit', onSubmit);
  scrollToTop();
});

// all declared functions have been removed from the document.ready
// section to allow for more organized & relevant code structure
let tweetFormHidden = true;
const onShowTweetInput = () => {
  if (tweetFormHidden === true) {
    $('#new-tweet-form').slideDown(300);
    $("#tweet-text").focus();
    tweetFormHidden = false;
  } else {
    $('#new-tweet-form').slideUp(300);
    tweetFormHidden = true;
  }
};

// used to sanitize tweet entries, prevents malicious code
const escape = function(str) {
  let div = document.createElement('div');

  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweetData) => {
  const { name, avatars, handle } = tweetData.user;
  const { text } = tweetData.content;
  let { created_at } = tweetData;
  created_at = new Date(created_at).toString().slice(0,25)

  const currentTweet = `
  <article class="tweet">
    <header>
      <img src="${avatars}" alt="avatar" height="125" width="125">
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

const renderTweets = (tweets) => {
  const tweetElements = [];

  for (let tweet of tweets) {
    tweetElements.push(createTweetElement(tweet));
  }

  // array in reverse to account for chronological order of tweets
  $('#tweet-container').html(tweetElements.reverse().join(''));
};

const loadTweets = () => {
  $.ajax({
    url: '/tweets/',
    type: 'GET',
    dataType: "json",
    success: (response) => {
      renderTweets(response);
    }
  });
};

// posting a new tweet resets the textarea value and char counter
// then reloads the tweets in chronological order
const postNewTweet = () => {
  $('#tweet-text').val('');
  $('.counter').val('140');
  loadTweets();
};

const onSubmit = function(event) {
  event.preventDefault();
  const charCount = $('#tweet-text').val().length;

  // error message hidden by default in CSS
  // slideDown() used to create jquery effect as required per instructions
  if (charCount !== 0 && charCount <= 140) {
    $.ajax({
      url: '/tweets/',
      type: 'POST',
      data: $(this).serialize(),
      success: (response) => {
        $('.error').hide(200);
        postNewTweet();
      }
    });
  } else {
    $('.error').slideDown(500);
  }
};

// stretch functions below

// scrollToBottom to scroll to  bottom of screen if 
// the user's scroll bar is near the top
const scrollToBottom = function() {
  $('.scroll-bottom').on('click', function() {
    $('html,body').animate({scrollTop: $(document).height()}, 1000)
    return;
  })
};

// scrollToTop to scroll to  bottom of screen if the 
// user's scroll bar is at a low enough position in the browser
const scrollToTop = function () {
  $('.scroll-top').on('click', () => {
    $('html, body').animate({scrollTop : 0},800);
    return;
  });

  // scrollToBottom is called in scrollToTop to allow for the scrollTop
  // method to be called for only one function once the document is ready
  // (this is done to ensure performance needs are not hindered)
  scrollToBottom();

  $(window).scroll(function(){
    if ($(this).scrollTop() > 325) {
      $('.scroll-top').fadeIn(500);
    } else {
      $('.scroll-top').fadeOut(500);
    }
  });
};