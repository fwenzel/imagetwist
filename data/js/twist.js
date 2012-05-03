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

    rotation(node, deg);
});


/**
 * Set a node's rotation, relative to its current rotation.
 */
function rotation(node, deg) {
    const rotate_re = /rotate\((-?\d+)deg\)/;

    if (deg === undefined) {
        node.style.MozTransform = '';
        return;
    }

    var rotated = node.style.MozTransform.match(rotate_re);
    if (rotated) {
        // If already rotated, adjust angle.
        deg = (parseInt(rotated[1]) + deg) % 360;
    }

    node.style.MozTransform = 'rotate(' + deg + 'deg)';
}