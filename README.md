imagetwist
==========

This is the imagetwist add-on. It allows you to rotate any image:

* Right-click -> Rotate image -> Clockwise / Counterclockwise / 180 degrees

On single-image pages (like the right-click -> "view image" page), images
will automatically be rotated based on their EXIF data.

Screenshot
----------
The right-click dialog:
![imagetwist right-click menu](https://raw.github.com/fwenzel/imagetwist/master/screenshot.jpg)

Example image
-------------
Mona Lisa after a gust of wind:
![Mona Lisa](https://raw.github.com/fwenzel/imagetwist/master/monalisa.jpg)

This image's pixels are oriented "sideways", but the EXIF orientation tag
defines how the picture should be shown instead.

To test imagetwist:
* Right-click the image, and choose "view image".
* **Without** imagetwist, the "view image" page will show the image as you see
here.
* **With** imagetwist enabled, the image on the page will look correct.

Acknowledgments
---------------

Thanks to:

* Jacob Seidelin for his [exif-js](https://github.com/jseidelin/exif-js)
  library.
* [Fat Cow](http://www.iconfinder.com/search/?q=iconset%3Afatcow) for the
  rotation icons (*CC by* licensed).

## License

This program is free software; it is distributed under an
[MIT License](http://github.com/fwenzel/imagetwist/blob/master/LICENSE.txt).

---

Copyright (c) 2013 Fred Wenzel.
