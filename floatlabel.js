var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function($) {
  var FloatLabel, FloatLabelForm;
  $.fn.floatlabel = function() {
    new FloatLabel(this);
    return this;
  };
  $.fn.floatlabelform = function() {
    this.find('.floatlabel').each(function(i, elem) {
      return new FloatLabel(elem);
    });
    return this;
  };
  FloatLabel = (function() {
    function FloatLabel(input_selector) {
      this.moveLabelPosition = __bind(this.moveLabelPosition, this);
      this.input = $(input_selector);
      this.name = this.input.attr('id');
      this.label = $("label[for=" + this.name + "]");
      this.input_location = this.input.position();
      this.input_css_props = {};
      this.initLabel();
      this.input.on('input', this.moveLabelPosition);
    }

    FloatLabel.prototype.getInputCss = function(prop_name) {
      var _base;
      return (_base = this.input_css_props)[prop_name] || (_base[prop_name] = parseInt(this.input.css(prop_name), 10));
    };

    FloatLabel.prototype.initLabel = function() {
      this.label.addClass('initlabel');
      return this.label.css({
        left: this.input_location.left + this.getInputCss('padding-left'),
        top: this.input_location.top
      });
    };

    FloatLabel.prototype.moveLabelPosition = function() {
      var x_offset, y_offset;
      x_offset = this.getInputCss('padding-left');
      y_offset = -this.getInputCss('padding-top') - this.getInputCss('border-top-width') - this.label.outerHeight(true);
      if (this.input.val() !== "") {
        this.label.addClass('transition showlabel');
        return this.label.css({
          left: this.input_location.left + x_offset,
          top: this.input_location.top + y_offset
        });
      } else {
        this.initLabel();
        return this.label.removeClass('showlabel');
      }
    };

    return FloatLabel;

  })();
  return FloatLabelForm = (function() {
    function FloatLabelForm(form) {
      this.form = $(form);
      this.form.find('.floatlabel').each(function(i, elem) {
        return new FloatLabel(elem);
      });
    }

    return FloatLabelForm;

  })();
})(jQuery);