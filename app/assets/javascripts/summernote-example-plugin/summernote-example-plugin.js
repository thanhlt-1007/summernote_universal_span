/**
 *
 * copyright [year] [your Business Name and/or Your Name].
 * email: your@email.com
 * license: Your chosen license, or link to a license file.
 *
 */
 (function (factory) {
  /* Global define */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
}(function ($) {
  // lang
  $.extend(true,$.summernote.lang, {

  });

  // options
  $.extend($.summernote.options, {

  });

  $.extend($.summernote.plugins, {
    'examplePlugin': function (context) {
      context.memo('button.examplePlugin', function() {
        console.log('examplePlugin:button.examplePlugin');
      });

      this.initialize = function () {
        console.log('examplePlugin:initialize');
      };

      this.destroy = function () {
        console.log('examplePlugin:destroy');
      };

      this.bindEnterKey = function ($input,$btn) {
        console.log('examplePlugin:bindEnterKey');
      };

      this.bindLabels = function ($input,$btn) {
        console.log('examplePlugin:bindLabels');
      };

      this.show = function () {
        console.log('examplePlugin:show');
      };
    }
  });
}));
