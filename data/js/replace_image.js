/**
 * Replace a processed image in the page with its new src.
 */
self.port.on('replace', function(msg) {
    var job_id = msg[0];
    var new_src = msg[1];
    var dir = msg[2];

    //console.log('replace: ' + job_id + ' ' + new_src);

    // Find our node.
    if (job_id === null) {
        // On a single-image page, we don't need a job id.
        var node = document.images[0];
    } else {
        var node = document.querySelector('img[data-imagetwist-jobid=' + job_id + ']');
        if (!node) {
            console.log('Oops, could not find image node for job id ' + job_id +
                        '. Nothing I can do :(');
            self.port.emit('destroyme');
            return;
        }
        node.removeAttribute('data-imagetwist-jobid'); // Discard job ID.
    }

    if (dir % 2) {
        // 90 or 270 degree turn: Flip width and height.
        var new_height = node.width;
        var new_width = node.height;
        node.height = new_height;
        node.width = new_width;
    }

    node.src = new_src;

    self.port.emit('destroyme');  // We don't need this pagemod any longer.
});
