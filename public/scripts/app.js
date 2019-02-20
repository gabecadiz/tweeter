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

//submit event handler on form

  $(function(){
    var $tweetForm = $("#tweetForm");
    $tweetForm.submit(function(event){
      event.preventDefault();
      let tweetText = $( this ).serialize();

        $.post( "/tweets", tweetText, function() {
          $('.tweet-text').val('');
          $('.counter').replaceWith(`<span class="counter">140</span>`)
          $('#tweet-container').empty();
          loadTweets()
      },"text");
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







