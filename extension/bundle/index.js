'use strict';

/*global $, main_html, style_css, toolbar_html*/
console.log('hello.')

// = include style.css
// = include main.html
// = include toolbar.html

// = include zepto.1.1.3.js
// = include riot.0.9.8.js


if ($('.dgw-toolbar').length) $('.dgw-toolbar').remove(); // remove app if exists

$('head').append('<style>' + style_css + '</style>');

console.log(style_css);

// App
var app = new App();
var user = new User();

var main = mainPres(main_html);
toolbarPres($('.dgw-toolbar', main), toolbar_html);
app.trigger('init');


// Youtube wandifier
function youtubeWand () {
  return $('a').filter(function () {
    console.log('filter')
    return $(this).attr('href').match(/.*user.*/);
  });
}


// Models
function App () {
  var self = $.observable(this);
  self.mode = {};

  self.on('enter:tip', function () {
    self.mode.tip = true;
  });

  self.on('exit:tip', function () {
    self.mode.tip = false;
  });
}

function User () {
  var self = $.observable(this);

  self.data = 'false';

  self.load = function () {
    $.get('https://localhost:3700/api/user', function(response, status){
      if (!response) return self.trigger('error');
      self.data = response;
      return self.trigger('loaded');
    });
  };
}


// Presenters
function mainPres (template) {
  var container = $(template).appendTo('body');

  app.on('exit', function () {
    container.remove();
  });

  app.on('enter:tip', function () {
    youtubeWand.addClass('dgw-wand');
  });

  return container;
}


function toolbarPres ($el, template) {

  // UI HANDLERS
  function uiHandlers () {
    $('.dgw-tip', $el).on('click', function () {
      app.trigger('enter:tip');
    });
  }

  // MESSAGE HANDLERS
  app.on('init', function () {
    user.load();
    user.on('loaded', function () {
      $el.html($.render(template, user.data)); // Render toolbar
      uiHandlers(); // Attach ui handlers
    });
  });
}
