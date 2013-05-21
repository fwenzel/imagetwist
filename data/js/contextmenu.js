// Requires: rotate.js

/** Context menu UI: Listen to click event on menu items. */
self.on('click', function(node, data) {
    var deg;

    switch (data) {
    case 'cw':
        deg = 90;
        break;

    case 'ccw':
        deg = -90;
        break;

    case '180':
    default:
        deg = 180;
        break;
    }

    rotate(node, deg);
});