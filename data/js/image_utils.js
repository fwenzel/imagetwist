/**
 * Replace an image node's src with a new src and remember original
 * src and orientation.
 */
function replaceImage(img, new_src, new_dir) {
    var dir;

    // Remember original src and current rotation for reverting.
    if (!img.hasAttribute('data-imagetwist-origsrc')) {
        img.setAttribute('data-imagetwist-origsrc', img.src);
    }

    // New direction is relative to existing orientation.
    if (img.hasAttribute('data-imagetwist-dir')) {
        dir = parseInt(img.getAttribute('data-imagetwist-dir'));
    } else {
        dir = 0;
    }
    dir = (dir + new_dir) % 4;
    img.setAttribute('data-imagetwist-dir', dir);

    // Set to rotated src.
    img.src = new_src;
}

/**
 * Flip image width and height.
 */
function flipDimensions(img) {
    var new_height = img.width;
    var new_width = img.height;
    img.height = new_height;
    img.width = new_width;
}

/**
 * Revert an image node.
 */
function revert(img) {
    if (!img || !img.hasAttribute('data-imagetwist-origsrc')) return;

    // Reset to original src.
    img.src = img.getAttribute('data-imagetwist-origsrc');
    img.removeAttribute('data-imagetwist-origsrc');

    // Flip (if necessary) and remove rotation direction.
    if (parseInt(img.getAttribute('data-imagetwist-dir')) % 2) {
        flipDimensions(img);
    }
    img.removeAttribute('data-imagetwist-dir');
}
