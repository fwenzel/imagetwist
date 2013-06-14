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

        self.port.emit('rotated', [canvas.toDataURL(), dir]);
    };
    img.src = src;
}

/**
 * Determine the rotation of the first loaded, local image, and rotate if
 * necessary.
 */
function determineRotation() {
    var img = document.images[0];
    EXIF.getData(img, function() {
        var orientation = EXIF.getTag(img, 'Orientation');

        // cf. http://sylvana.net/jpegcrop/exif_orientation.html
        // We only handle the cases we can with rotation, not mirroring for now.
        switch (orientation) {
        // Case 1 and 2 are top-up already.
        case 1:
        case 2:
        default:
            self.port.emit('cancel');
            return;
        case 3:
        case 4:
            // 180 deg
            rotateImage([img.src, 2]);
            break;
        case 5:
        case 6:
            // 90 deg
            rotateImage([img.src, 1]);
            break;
        case 7:
        case 8:
            // 270 deg
            rotateImage([img.src, 3]);
            break;
        }
    });
}

// Listeners
self.port.on('rotate', rotateImage);
self.port.on('determineRotation', determineRotation);
