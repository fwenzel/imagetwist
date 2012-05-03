self.on('click', function(node, data) {
    var deg,
        rotated;

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

    rotated = rotation(node);
    if (rotated) {
        // If already rotated, adjust angle.
        deg = (parseInt(rotated[1]) + deg) % 360;
    }

    rotation(node, deg);
});


/**
 * Return a node's rotation or set it.
 */
function rotation(node, deg) {
    const rotate_re = /rotate\((-?\d+)deg\)/;

    if (deg === undefined)
        return node.style.MozTransform.match(rotate_re);

    node.style.MozTransform = 'rotate(' + deg + 'deg)';
}