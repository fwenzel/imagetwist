const cm = require("context-menu");
const data = require("self").data;

// Right-click menu
cm.Menu({
    label: 'Rotate Image',
    context: cm.SelectorContext('img'),
    contentScriptFile: [data.url('js/jquery-1.7.2.min.js'),
                        data.url('js/rotate.js'),
                        data.url('js/contextmenu.js')],
    items: [
        cm.Item({label: "Rotate Counterclockwise (CCW)", data: "ccw",
                 image: data.url('img/ccw.png')}),
        cm.Item({label: "Rotate Clockwise (CW)", data: "cw",
                 image: data.url('img/cw.png')}),
        cm.Item({label: "Rotate 180 Degrees", data: "180"})
    ]
});
