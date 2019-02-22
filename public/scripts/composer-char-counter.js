$(document).ready(function() {

  $('.tweet-text').on('input',function(){
    let tweetLength = this.value.length;
    let $counter = $(this).parent().find(".counter")
    $counter.text(140 - tweetLength)
    if(tweetLength <= 140){
      $counter.css({"color":"#244751","font-weight":"normal"})
    } else {
      $counter.css({"color":"red","font-weight":"bold"})
    }
  })
});