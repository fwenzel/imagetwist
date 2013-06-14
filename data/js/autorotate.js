/**
 * Automatically rotate images based on exif data if this is a "view image"
 * page.
 */
if (document.body.childElementCount === 1 && document.images.length === 1) {
    // Heuristic: If we have only one node in the body and it's an image,
    // we can do our thing.
    self.port.emit('exif');
}
