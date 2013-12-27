var targeter = require('./targeter')

var $ = jQuery

var chats = $('.chats')
  , body = $('body')
if (!chats.length) {
  // if we're not on a meatspace-like page, GET THE HELL OUT OF HERE
} else {
  // good to go!
  targeter($, chats, body)
}
