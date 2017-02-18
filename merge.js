const cx = require('classnames/bind');
const assign = require('object-assign');
function merge() {
    var styles = mergeStyles({}, Array.prototype.slice.apply(arguments));
    styles.mergeStyles = function() {
        return mergeStyles(assign({}, styles), Array.prototype.slice.apply(arguments));
    };
    return styles;
}

function mergeStyles(style, styles) {
    if (!styles || !styles.length) {
        return style;
    }
    var keys = Object.keys(style);
    for (var idx in keys) {
        var key = keys[idx];
        if (typeof style[key] !== 'string') {
            continue;
        }
        style[key] = style[key].split(/ /);
    }

    for (var _len = styles.length, _key = 0; _key < _len; _key++) {
        var sty = styles[_key];
        if (!sty) {
            continue;
        }
        var keys = Object.keys(sty);
        for (var key in keys) {
            key = keys[key];
            var val = sty[key];
            if (typeof val !== 'string') {
                continue;
            }
            val = val.split(/ /);
            if (style[key]) {
                style[key] = style[key].concat(val);
            } else {
                style[key] = [key].concat(val);
            }

        }
    }
    var keys = Object.keys(style);
    const cxStyle = cx.bind(style);
    for (var idx in keys) {
        var key = keys[idx];
        if (!Array.isArray(style[key])) {
            continue;
        }
        style[key] = style[key].filter(onlyUnique).join(' ');
        cxStyle[key] = style[key];
    }

    return cxStyle;
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
module.exports = merge;