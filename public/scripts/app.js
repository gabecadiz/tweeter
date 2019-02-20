/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {


// Fake data taken from tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
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
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];
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
      $('#tweet-container').append($tweet);
    });
  }

//calls renderTweets to display all tweets in database
renderTweets(data);


//submit event handler on form

  $(function(){
    var $tweetForm = $("#tweetForm");
    $tweetForm.submit(function(event){
      event.preventDefault();
      let tweetText = $( this ).serialize();
      $.post( "/tweets", tweetText, function() {
      },"text");
    });
  })

});







