/**
 * Set a node's rotation, relative to its current rotation.
 */
function rotate(node, dir) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // Create image w/the same src to determine full resolution of image.
    var img = new Image();
    img.onload = function() {
        var cur_w = img.width,
            cur_h = img.height;

        switch (dir) {
        case 'cw':
            canvas.width = img.height;
            canvas.height = img.width;
            img_x = 0;
            img_y = -img.height;
            new_width = node.height;
            new_height = node.width;
            angle = Math.PI / 2;
            break;

        case 'ccw':
            canvas.width = img.height;
            canvas.height = img.width;
            img_x = -img.width;
            img_y = 0;
            new_width = node.height;
            new_height = node.width;
            angle = -Math.PI / 2;
            break;

        case '180':
            canvas.width = img.width;
            canvas.height = img.height;
            img_x = -img.width;
            img_y = -img.height;
            new_width = node.width;  // No size change w/180 degrees.
            new_height = node.height;
            angle = Math.PI;
            break;
        }

        ctx.rotate(angle);
        ctx.drawImage(node, img_x, img_y);

        node.src = canvas.toDataURL();
        node.width = new_width;
        node.height = new_height;
    };
    img.src = node.src;
}