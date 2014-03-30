pouzApp.service('notifications', function() {

  var notify = function(e)
  {
    //alert(e);
    //goBgService();

    //navigator.notification.vibrate(2000);
    //navigator.notification.beep(1);

    console.log("interruption recieved - " + JSON.stringify(e));

    if (!APP_IS_ACTIVE)
    {
      var now = new Date().getTime();
      var _almost_now = new Date(now + 2 * 1000);

      window.plugin.notification.local.add({
        //id:      1,
        title:   e.label,
        message: 'Time for an interruption!',
        date:    _almost_now,
        autoCancel: true,

        json:   JSON.stringify(e)
      });

      console.log("after notification");
    }
    else
    {
      // go directly and display the interruptions
      DEBUG && alert('Interuption! ' + e.label);
    }
  }

  return {
    notify: notify
  };

});