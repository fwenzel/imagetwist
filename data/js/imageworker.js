/**
 * Page worker code: Given an image src, obtain image, rotate it in canvas,
 * and return the result.
 *
 * Data passed in expected as [src, dir].
 */
function rotateImage(msg) {
    var src = msg[0];
    var dir = msg[1];

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    var img = new Image();
    img.onload = function() {
        var angle = dir * Math.PI / 2,
            img_x,
            img_y;

        switch (dir) {
        case 1:  // 90 degrees
            canvas.width = img.height;
            canvas.height = img.width;
            img_x = 0;
            img_y = -img.height;
            break;

        case 2:  // 180 degrees
            canvas.width = img.width;
            canvas.height = img.height;
            img_x = -img.width;
            img_y = -img.height;
            break;

        case 3:  // 270 degrees
            canvas.width = img.height;
            canvas.height = img.width;
            img_x = -img.width;
            img_y = 0;
            break;
        }

        ctx.rotate(angle);
        ctx.drawImage(img, img_x, img_y);

        canvas.toBlob(function(blob) {
            var new_url = URL.createObjectURL(blob);
            self.port.emit('rotated', new_url);
        });
    };
    img.src = src;
}

self.port.on('rotate', rotateImage);
