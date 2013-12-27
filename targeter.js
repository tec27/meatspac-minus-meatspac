var fs = require('fs')

function doTargeting($, chats, body) {
  if (body.hasClass('msm-minused') || body.hasClass('msm-targeting')) {
    // if targeting is currently active or has already been applied, toggle the bookmarklet's
    // features off
    $('#minusing-rule').remove()
    body.removeClass('msm-minused').removeClass('msm-targeting')
    return
  }

  addMeatspacStyles()
  body.addClass('msm-targeting')

  chats.one('click', 'li[data-action="chat-message"]', function() {
    var target = $(this)
      , fingerprint = target.data('fingerprint')
      , styleRule = getMinusingStyleRule(fingerprint)

    $('head').append('<style type="text/css" id="minusing-rule">' + styleRule + '</style>')
    body.removeClass('msm-targeting')
      .addClass('msm-minused')
  })
}

function addMeatspacStyles() {
  if ($('#meatspac-minus-styles').length) {
    return
  }

  var styles = fs.readFileSync(__dirname + '/styles.css')
  $('head').append('<style type="text/css" id="meatspac-minus-styles">' + styles + '</style>')
  $('.header').append('<span class="msm-header">Select a target!</span>')
}

function getMinusingStyleRule(fingerprint) {
  return (
    '.msm-minused .chats li[data-action="chat-message"][data-fingerprint="' + fingerprint + '"] {' +
      'display: block;' +
    '}');
}

module.exports = doTargeting
