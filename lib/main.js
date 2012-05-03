const cm = require("context-menu"),
      data = require("self").data;


cm.Menu({
    label: 'Rotate Image',
    context: cm.SelectorContext('img'),
    contentScriptFile: data.url('js/twist.js'),
    items: [
        cm.Item({label: "Rotate Counterclockwise (CCW)", data: "ccw",
                 image: data.url('img/ccw.png')}),
        cm.Item({label: "Rotate Clockwise (CW)", data: "cw",
                 image: data.url('img/cw.png')}),
        cm.Item({label: "Rotate 180 Degrees", data: "180"})
    ]
});