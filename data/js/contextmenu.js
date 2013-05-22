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
    self.postMessage([job_id, node.src, parseInt(dir)]);
}

/** Context menu UI: Listen to click event on menu items. */
self.on('click', mark_for_rotation);
