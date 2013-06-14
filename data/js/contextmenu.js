/**
 * Mark an img node for rotation, then notify the backend to get it processed.
 *
 * node: image node. dir: rotation (in clockwise quarter turns).
 */
function mark_for_rotation(node, dir) {
    // Mark node with job ID so we find it again later.
    var job_id = 'job-' + Math.floor((Math.random() * 100000));  // Random job ID for rotation.
    node.setAttribute('data-imagetwist-jobid', job_id);

    // Send job data to backend.
    var src;
    if (dir === 'exif' && node.hasAttribute('data-imagetwist-origsrc')) {
        // Use original src for EXIF detection.
        src = node.getAttribute('data-imagetwist-origsrc');
    } else {
        src = node.src;
    }
    self.postMessage([job_id, src, parseInt(dir) || dir]);
}

/** Context menu UI: Listen to click event on menu items. */
self.on('click', mark_for_rotation);
