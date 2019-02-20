/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function timeAgo(difference){
    let minutes = Math.floor(difference / 60000);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);

    if (days){
      return `${days} days ago`
    }else if (hours){
      return `${hours} hours ago`
    }else {
      return `${minutes} minutes ago`
    }

  };

var d = new Date();
var n = d.getTime();

function timeDifference(comparedTime){
  let timeDif = n - comparedTime;
     return timeAgo(timeDif);
  };



  function createTweetElement(data){
   let personName = data.user.name;
   let profilePicture = data.user.avatars.regular;
   let userHandle = data.user.handle;
   let personalTweet = data.content.text;
   let tweetAge = data.created_at;

   let tweetAgeDifference = timeDifference(tweetAge)

   let tweet =
   `<article class="tweets">
      <header class = "article-tweets-header">
        <img class="profile-picture" src="${escape(profilePicture)}">
        <span class ="person-name"> ${escape(personName)} </span>
        <span class ="user-handle"> ${escape(userHandle)} </span>
      </header>

    <div class ="personal-tweet"> ${escape(personalTweet)}</div>

    <footer class = "article-tweets-footer">
      <span class ="tweet-age"> ${escape(tweetAgeDifference)}</span>
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

$( "#compose-button" ).click(function() {
  $( ".new-tweet" ).toggle();
  $(".tweet-text").focus();
});




});







