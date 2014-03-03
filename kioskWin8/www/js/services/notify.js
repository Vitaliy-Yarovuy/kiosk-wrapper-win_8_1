'use strict';

app.factory('notify',function ($rootScope, data, connect){
    var src = connect.getPhoneGapPath() + "audio/garcon.mp3";

    function play(){
        var snd = new Media(src,function(){
            //alert("media success " + JSON.stringify(arguments));
        },function(){
            //alert("media error " + JSON.stringify(arguments));
        });
        snd.play();
    }



    function vibrate(){
        navigator.notification && navigator.notification.vibrate && navigator.notification.vibrate(2000);
    }

    function notify(setting){
        setting = setting || data.getSettings().notification;
        if(setting == "all"){
            play();
            vibrate();
        }
        if(setting == "vibro"){
            vibrate();
        }
        if(setting == "sound"){
            play();
        }
    }

    return {
        notify: notify
    };
});