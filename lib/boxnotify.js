const { Cc, Ci } = require('chrome'),
      data = require('self').data,
      timer = require('timer'),
      windowutils = require('sdk/window/utils');

const addon_name = 'ImageTwist',
      addon_icon = data.url('img/logo64.png');


/** Notify via notification box. */
function notify(txt) {
    let nb = getNotificationBox();
    let notification = nb.appendNotification(
        txt,
        'jetpack-notification-box',
        addon_icon || 'chrome://browser/skin/Info.png',
        nb.PRIORITY_INFO_MEDIUM,
        []
    );

    timer.setTimeout(function() {
        notification.close();
    }, 5 * 1000);
}

/**
 * Get notification box ("yellow bar").
 * Courtesy of bug 533649.
 */
function getNotificationBox() {
    let browser = windowutils.getMostRecentBrowserWindow().gBrowser,
        notificationBox = browser.getNotificationBox();
    return notificationBox;
}

/** Exports */
exports.notify = notify;
