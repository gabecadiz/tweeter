/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

    $('.tweet-text').keypress(function(event){
    $("#error-message")
    .slideUp("medium")
    .html("")
  })

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

//variables that get the current time in milliseconds
var d = new Date();
var todaysTime = d.getTime();


//function that gets the difference between current date and tweet submission
function timeDifference(comparedTime){
  let timeDif = todaysTime - comparedTime;
     return timeAgo(timeDif);
  };


//function that determines age of tweet in days, if not hours, if not minutes
  function timeAgo(difference){
    let minutes = Math.floor(difference / 60000);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);

    if (days >= 1){
          return `${days} days ago`
    } else if (hours >= 1){
        return `${hours} hours ago`
      } else {
          return `${minutes} minutes ago`
        }

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
      <img class="heart" src="/images/green-heart.png">
      <img class="retweet" src="/images/retweet.png">
      <img class="flag" src="/images/flag-icon.jpg">
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
        $("#error-message")
          .css("display","none")
          .slideToggle("slow")
          .html("<b>Oops</b>: Click the tweet button to submit your tweet!")
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
      let errorMessage = $("#error-message");

      if(tweetInputLength <= 0){
        errorMessage
          .css("display","none")
          .slideToggle("medium")
          .html("<b>Error</b>: Please input some text above in order to tweet!")
            $(".tweet-text").focus();
          return;
      } else if (tweetInputLength > 140){
          errorMessage
            .css("display","none")
            .slideToggle("medium")
            .html("<b>Oops</b>: Tweet is longer than the 140 character limit!");
              $(".tweet-text").focus();
            return;
        } else{
            $("#error-message").css("display","none");
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
    $("#error-message").css("display","none");
    $(".new-tweet" ).slideToggle("slow");
    $(".tweet-text").focus();
    $("#tweet-button").toggle();
    $(".counter").toggle();
  });



});







