/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

  function createTweetElement(data){
   let personName = data.user.name;
   let profilePicture = data.user.avatars.regular;
   let userHandle = data.user.handle;
   let personalTweet = data.content.text;
   let tweetAge = data.created_at;

   let tweet =
   `<article class="tweets">
      <header class = "article-tweets-header">
        <img class="profile-picture" src="${profilePicture}">
        <span class ="person-name"> ${personName} </span>
        <span class ="user-handle"> ${userHandle} </span>
      </header>

    <div class ="personal-tweet"> ${personalTweet}</div>

    <footer class = "article-tweets-footer">
      <span class ="tweet-age"> ${tweetAge}</span>
      <img class="flag" src="/images/flag-icon.jpg">
      <img class="retweet" src="/images/retweet.png">
      <img class="heart" src="/images/green-heart.png">
    </footer>
   </article>`;

  return tweet;
  }

  function renderTweets(tweets) {
    tweets.forEach(function(element){
      let $tweet = createTweetElement(element);
      $('#tweet-container').prepend($tweet);
    });
  }

  //prevents textarea from recieving newlines/enter key
   $(".tweet-text").keydown(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
  });

//submit event handler on form

  $(function(){
    var $tweetForm = $("#tweetForm");
    $tweetForm.submit(function(event){
      event.preventDefault();

      let tweetSerial = $( this ).serialize();
      let $tweetBox = $(".tweet-text");
      let tweetInputLength = $tweetBox.val().length;

      if(tweetInputLength <= 0){
          alert("No text detected");
          return;
      } else if (tweetInputLength > 140){
          alert("Tweet is above 140 character limit");
          return;
      } else{

        $.post( "/tweets", tweetSerial, function() {
          $('.tweet-text').val('');
          $('.counter').html(140);
          $('#tweet-container').empty();
          loadTweets()
          },"text");
        }
    });
  })

  //Fetching tweets with Ajax
  function loadTweets(){
    $.get("/tweets", function(element){
     renderTweets(element)
    })
  }
loadTweets()
});







