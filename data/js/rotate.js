/**
 * Set a node's rotation, relative to its current rotation.
 */
function rotate(node, deg) {
    const rotate_re = /rotate\((-?\d+)deg\)/;
    var $node = $(node);

    if (deg === undefined) {
        $node.css('-moz-transform', '');
        return;
    }

    // Wrap node so we can make room for the rotation.
    var $wrapper = $node.parent();
    if (!$wrapper.hasClass('rotationwrapper')) {
        $node.wrap('<div class="rotationwrapper">');
        $wrapper = $node.parent();
    }
    var wrapper = $wrapper.get(0);

    var rotated = wrapper.style.MozTransform.match(rotate_re);
    if (rotated) {
        // If already rotated, adjust angle.
        deg = (parseInt(rotated[1]) + deg) % 360;
    } else {
        deg = parseInt(deg);
    }

    // Adjust wrapper size.
    if (Math.abs(deg % 180) == 90) {
        $wrapper.css('width', $node.outerHeight());
        $wrapper.css('height', $node.outerWidth());
    } else {
        $wrapper.css('width', '');
        $wrapper.css('height', '');
    }

    wrapper.style.MozTransform = 'rotate(' + deg + 'deg)';
}