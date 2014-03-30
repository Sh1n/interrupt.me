pouzApp.service('PhoneGap', [function() {

  var load_facebook_api = function(ready_callback) {
    if (window.cordova || window.PhoneGap || window.phonegap) {
      DEBUG && alert('loading PhoneGap libs');

      jQuery.getScript('js/fb/facebook-js-sdk.js', function() {
        DEBUG && alert('PhoneGap is loaded');

        document.addEventListener('deviceready', function() {
          ready_callback();
        }, false);
      })
      .fail(function(xhr, settings, exception) {
        DEBUG && alert('js failed to load ' + exception);
      });

    } else {

      // initialize FB online
      $(function() {

        window.fbAsyncInit = function() {
          FB.init({
            appId: app.fbId,
            status: true,
            xfbml: true
          });

          ready_callback();

        };

        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "//connect.facebook.net/en_US/all.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));

      })

    }
  }

  return {
    load_facebook_api: load_facebook_api
  }

}]);