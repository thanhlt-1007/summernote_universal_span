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
  $.extend(true, $.summernote.lang, {
    'en-US': {
      examplePlugin: {
        exampleText: 'Example Text',
        dialogTitle: 'Example Plugin',
        okButton: 'OK'
      }
    }
  });
  $.extend($.summernote.options, {
    examplePlugin: {
      icon: '<b>cf.</b>',
      tooltip: 'Example Plugin Tooltip'
    }
  });
  $.extend($.summernote.plugins, {
    'examplePlugin': function (context) {
			var self = this,
				ui = $.summernote.ui,
				$note = context.layoutInfo.note,
				$editor = context.layoutInfo.editor,
				$editable = context.layoutInfo.editable,
				$toolbar = context.layoutInfo.toolbar,
				options = context.options,
				lang = options.langInfo;

			context.memo('button.examplePlugin', function() {
				var button = ui.button({
					contents: options.examplePlugin.icon,
					tooltip: lang.examplePlugin.tooltip,
					codeviewKeepButton: true,
				});

				return button.render();
			});
    }
  });
}));
