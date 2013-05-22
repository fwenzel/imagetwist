const cm = require('sdk/context-menu');
const data = require('sdk/self').data;
const pageWorker = require('sdk/page-worker');
const tabs = require('sdk/tabs');

// Right-click menu
var menu = cm.Menu({
    label: 'Rotate Image',
    context: cm.SelectorContext('img'),
    contentScriptFile: data.url('js/contextmenu.js'),
    items: [
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
            contentScriptFile: data.url('js/imageworker.js'),
            contentURL: src
        });
        worker.port.on('rotated', function(msg) {
            pagemod.port.emit('replace', [job_id, msg, dir]);
            worker.destroy();
        });
        worker.port.emit('rotate', [src, dir]);
    }
});
