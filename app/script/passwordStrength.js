(function(a) {
    a.fn.passwordStrength = function(b) {
        b = a.extend({}, a.fn.passwordStrength.defaults, b);
        this.each(function() {
            var d = a(this), e = 0, c = false, f = a(this).parents("form").find(".passwordStrength");
            d.bind("keyup", function() {
                f.show();
                e = a.fn.passwordStrength.ratepasswd(d.val(), b);
                e >= 0 && c == false && (c = true);
                f.find("i").removeClass("on");
                if (e < 35 && e >= 0) {
                    f.addClass('i1').removeClass('i2 i3')
                    f.find("i:first").addClass("on")
                } else {
                    if (e < 60 && e >= 35) {
                        f.addClass('i2').removeClass('i1 i3')
                        f.find("i:lt(2)").addClass("on")
                    } else {
                        if (e >= 60) {
                            f.addClass('i3').removeClass('i1 i2')
                            f.find("i:lt(3)").addClass("on")
                        }
                    }
                }
                if (c && (d.val().length < b.minLen || d.val().length > b.maxLen)) {
                    b.showmsg(d, d.attr("errormsg"), 3)
                } else {
                    if (c) {
                        b.showmsg(d, "", 2)
                    }
                }
                b.trigger(d, !(e >= 0))
            });
            d.bind("blur", function(){
                f.hide();
            });
        })
    };
    a.fn.passwordStrength.ratepasswd = function(c, d) {
        var b = c.length, e;
        if (b >= d.minLen && b <= d.maxLen) {
            e = a.fn.passwordStrength.checkStrong(c)
        } else {
            e = -1
        }
        return e / 4 * 100
    };
    a.fn.passwordStrength.checkStrong = function(d) {
        var e = 0, b = d.length;
        for (var c = 0; c < b; c++) {
            e |= a.fn.passwordStrength.charMode(d.charCodeAt(c))
        }
        return a.fn.passwordStrength.bitTotal(e)
    };
    a.fn.passwordStrength.charMode = function(b) {
        if (b >= 48 && b <= 57) {
            return 1
        } else {
            if (b >= 65 && b <= 90) {
                return 2
            } else {
                if (b >= 97 && b <= 122) {
                    return 4
                } else {
                    return 8
                }
            }
        }
    };
    a.fn.passwordStrength.bitTotal = function(b) {
        var d = 0;
        for (var c = 0; c < 4; c++) {
            if (b & 1) {
                d++
            }
            b >>>= 1
        }
        return d
    };
    a.fn.passwordStrength.defaults = {minLen: 0,maxLen: 30,trigger: a.noop}
})(jQuery);
