/**
 * Replace a processed image in the page with its new src.
 */
self.port.on('replace', function(msg) {
    var job_id = msg[0];
    var new_src = msg[1];
    var dir = msg[2];

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

    if (dir % 2) {  // 90 or 270 degree turn: Flip width and height.
        flipDimensions(node);
    }

    replaceImage(node, new_src, dir)

    // On a single-image page, allow to revert.
    if (job_id === null) {
        var style = document.createElement('style');
        var p = document.createElement('p');

        style.innerHTML = 'p {' +
            'color: #fff; font: 10pt sans-serif; position: absolute;' +
            'bottom: 0; right: .5em; }' +
            'a { color: #fff; padding: .2em; }' +
            'a#revert { font-size: 150%; margin: 0 1em; }';
        p.innerHTML = 'Image was automatically rotated.<sup><a href="' +
            'https://addons.mozilla.org/addon/imagetwist/">(?)</a></sup> ' +
            '<a href="#" id="revert">&#10008;</a>';
        document.head.appendChild(style);
        document.body.appendChild(p);

        var revertLink = document.querySelector('a#revert');
        revertLink.href = window.location.href;
        revertLink.addEventListener('click', function(e) {
            e.preventDefault();
            var img = document.images[0];
            revert(img);
            document.body.removeChild(p);
        });
    }

    self.port.emit('destroyme');  // We don't need this pagemod any longer.
});


/**
 * No rotation necessary, drop job ID.
 */
self.port.on('cancel', function(job_id) {
    var node = document.querySelector('img[data-imagetwist-jobid=' + job_id + ']');
    if (node) {
        revert(node);
        node.removeAttribute('data-imagetwist-jobid');
    }
});
