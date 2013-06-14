const cm = require('sdk/context-menu');
const data = require('sdk/self').data;
const pageMod = require('sdk/page-mod');
const pageWorker = require('sdk/page-worker');
const tabs = require('sdk/tabs');

// Right-click menu
var menu = cm.Menu({
    label: 'Rotate Image',
    context: cm.SelectorContext('img'),
    contentScriptFile: data.url('js/contextmenu.js'),
    items: [
        cm.Item({label: 'Auto-rotate', data: 'exif',
                 image: data.url('img/auto.png')}),
        cm.Item({label: 'Rotate Counterclockwise (CCW)', data: '3',
                 image: data.url('img/ccw.png')}),
        cm.Item({label: 'Rotate Clockwise (CW)', data: '1',
                 image: data.url('img/cw.png')}),
        cm.Item({label: 'Rotate 180 Degrees', data: '2',
                 image: data.url('img/180.png')})
    ],
    onMessage: function(msg) {
        var job_id = msg[0],
            src = msg[1],
            dir = msg[2];

        // Attach a page mod, let it do its thing.
        var pagemod = tabs.activeTab.attach({
            contentScriptFile: data.url('js/replace_image.js')
        });
        pagemod.port.on('destroyme', function() {
            // Throw worker away when we're done here.
            pagemod.destroy();
        });

        // Create worker DOM at the right origin and rotate image there.
        var worker = pageWorker.Page({
            contentScriptFile: [data.url('js/exif-js/binaryajax.js'),
                                data.url('js/exif-js/exif.js'),
                                data.url('js/imageworker.js')],
            contentURL: src
        });
        worker.port.on('rotated', function(msg) {
            // msg == [new_src, dir]
            pagemod.port.emit('replace', [job_id, msg[0], msg[1]]);
            worker.destroy();
        });
        worker.port.on('cancel', function() {  // No rotation performed.
            pagemod.port.emit('cancel', job_id);
            worker.destroy();
        });
        if (dir !== 'exif') {  // Specific rotation requested.
            worker.port.emit('rotate', [src, dir]);
        } else {  // Auto-rotation requested.
            worker.port.emit('determineRotation');
        }
    }
});

// Auto-rotate single image pages.
pageMod.PageMod({
    include: ['*', 'file://*'],
    contentScriptFile: data.url('js/autorotate.js'),
    contentScriptWhen: 'end',  // "View Image" doesn't fire DOMready
    onAttach: function(worker) {
        worker.port.on('exif', function() {
            var exifMod = worker.tab.attach({
                contentScriptFile: [data.url('js/exif-js/binaryajax.js'),
                                    data.url('js/exif-js/exif.js'),
                                    data.url('js/imageworker.js'),
                                    data.url('js/replace_image.js')]
            });
            exifMod.port.on('rotated', function(msg) {
                // expects: msg == [new_src, dir]
                exifMod.port.emit('replace', [null, msg[0], msg[1]]);
            })
            exifMod.port.emit('determineRotation');
        });
    }
})
