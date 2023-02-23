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
    examplePlugin: {
      tooltip: '関連記事',
      dialog: {
        title: 'Example Plugin'
      },
      button: {
        ok: 'OK'
      }
    }
  });

  // options
  $.extend($.summernote.options, {
    examplePlugin: {
      icon: '<i class="note-icon-pencil"/>'
    }
  });

  $.extend($.summernote.plugins, {
    'examplePlugin': function (context) {
      console.log('examplePlugin');

      /**
       * Object examplePlugin
       */
      var self = this;

      /**
       * ui JSON
       * ui has renders to build ui elements
       * for eg: you can create a button wwith ui.button
       */
      var ui = $.summernote.ui;

      /**
       * options JSON
       * options.lang "ja-JP"
       * options.langInfo { examplePlugin: }
       * options.examplePlugin { icon: ,tooltip: }
       * options.icons {}
       * options.xxx
       * options holds the Options Information from Sumernote and what we extended above
       */
      var options = context.options;

      /**
       * lang JSON
       * lang.examplePlugin { dialogTitle: ,okButton:  }
       * lang holds the Language Information from Summernote and what we extended above
       */
      var lang = options.langInfo;

      /**
       * DOM div#summernote
       */
      var $note = context.layoutInfo.note;

      /**
       * DOM div.note-editor
       */
      var $editor = context.layoutInfo.editor;

      /**
       * DOM div.note-editable
       */
      var $editable = context.layoutInfo.editable;

      /**
       * DOM div.note-editable
       */
      var $toolbar = context.layoutInfo.toolbar;

      context.memo('button.examplePlugin', function() {
        console.log('examplePlugin:button.examplePlugin');

        var button = ui.button({
          contents: options.examplePlugin.icon,
          tooltip: lang.examplePlugin.tooltip,
          codeviewKeepButton: true,
          click:function (e) {
            context.invoke('examplePlugin.show');
          }
        });

        return button.render();
      });

      this.initialize = function () {
        console.log('examplePlugin:initialize');

        var $container = options.dialogsInBody ? $(document.body) : $editor;

        var body = '<div class="form-group">' +
                   '</div>';
        var footer = '<button href="#" class="btn btn-primary note-examplePlugin-btn">' + lang.examplePlugin.button.ok + '</button>';

        this.$dialog = ui.dialog({

          // Set the title for the Dialog. Note: We don't need to build the markup for the Modal
          // Header, we only need to set the Title.
          title: lang.examplePlugin.dialog.title,

          // Set the Body of the Dialog.
          body: body,

          // Set the Footer of the Dialog.
          footer: footer

        // This adds the Modal to the DOM.
        }).render().appendTo($container);
      };

      this.destroy = function () {
        console.log('examplePlugin:destroy');

        ui.hideDialog(this.$dialog);
        this.$dialog.remove();
      };

      this.bindEnterKey = function ($input,$btn) {
        console.log('examplePlugin:bindEnterKey');

        $input.on('keypress', function (event) {
          if (event.keyCode === 13) $btn.trigger('click');
        });
      };

      this.bindLabels = function ($input,$btn) {
        console.log('examplePlugin:bindLabels');

        self.$dialog.find('.form-control:first').focus().select();
        self.$dialog.find('label').on('click', function () {
          $(this).parent().find('.form-control:first').focus();
        });
      };

      this.show = function () {
        console.log('examplePlugin:show');

        var $img = $($editable.data('target'));
        var editorInfo = {

        };
        this.showexamplePluginDialog(editorInfo).then(function (editorInfo) {
          ui.hideDialog(self.$dialog);
          $note.val(context.invoke('code'));
          $note.change();
        });
      };

      this.showexamplePluginDialog = function(editorInfo) {
        console.log('examplePlugin:showexamplePluginDialog');

        return $.Deferred(function (deferred) {
          var $editBtn = self.$dialog.find('.note-examplePlugin-btn');

          ui.onDialogShown(self.$dialog, function () {
            context.triggerEvent('dialog.shown');
            $editBtn.click(function (e) {
              e.preventDefault();
              deferred.resolve({

              });
            });
            self.bindEnterKey($editBtn);
            self.bindLabels();
          });
          ui.onDialogHidden(self.$dialog, function () {
            $editBtn.off('click');
            if (deferred.state() === 'pending') deferred.reject();
          });
          ui.showDialog(self.$dialog);
        });
      };
    }
  });
}));
