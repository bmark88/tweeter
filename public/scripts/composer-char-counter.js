// $(document).ready(function(event) {
//   console.log('hello')
//   console.log(event);
// });

$('#tweet-text').on('keyup keydown', function () {
  let inputTextLength = $(this).val().length;
  let charCount = $(this).siblings(".counter")[0];
  charCount.value = 140 - inputTextLength;

  if (charCount.value < 0) {
    $(charCount).addClass("over-char-limit")
  } else {
    $(charCount).removeClass("over-char-limit")
  }
})