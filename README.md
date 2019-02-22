# Tweeter Project

Tweeter is a simple single-page AJAX based Twitter clone.

Presentation is done by HTML, CSS, JavaScript and jQuery. The server is handled with Node, Express and AJAX and it incorporates MongoDB to handle the tweet database.

This project was a lot of fun and I hope you have a good experience using it!

#### Example of Tweeters compose box
!["Screenshot of tweet compose box"](https://github.com/gabecadiz/tweeter/blob/master/docs/tweet-box.png)

The tweet box appears once a user clicks on the compose button on the top right of the header. Type your tweet in the text area, click tweet and boom! Your tweet is now displayed forever! Tweets are limited to 140 characters and empty tweets are not allowed.

#### Example of Tweeters tweet feed
!["Screenshot of example tweets"](https://github.com/gabecadiz/tweeter/blob/master/docs/example-tweets.png)

Hovering over an individual tweet highlights the tweet! Flag, retweet and heart icons highlight when hovered. (functionality to be added soon!)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- Body-parser
- Chance
- md5
- mongodb
- nodemon

