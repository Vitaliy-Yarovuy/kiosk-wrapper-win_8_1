'use strict';

app.factory('connect',function ($rootScope, data){

    function get404Path(cb){
        if(data.get404PageLoadStatus()){
            window.localforage.getItem('kiosk-app-404', function(p404) {
                cb(null,"data:text/html;charset=utf-8," + escape(p404));
            });
        } else {
            cb(null,"./404.html");
        }
    }

    function checkUrl(server, cb){
        var isSend = false;
        $.ajax({
            url: server.url,
            type: 'GET',
            timeout: server.timeout*1000,
            crossDomain: true,
            complete: function(xhr, textStatus){
                console.log("complete",arguments);
                !isSend && (isSend = true) && cb(xhr.status == 200 && textStatus == "success");
            },
            error: function(jqXHR,textStatus){
                !isSend && (isSend = true) && cb(false);
            }
        });
    }


    function save404(url,cb){
        $.ajax({
            url: url,
            type: 'GET',
            crossDomain: true,
            complete: function(xhr, textStatus){
                if (textStatus == "success") {
                    window.localforage.setItem('kiosk-app-404', xhr.responseText, function (result) {
                        data.set404PageLoadStatus(true);
                        cb(null, true);
                    });
                } else {

                }
            },
            error: function(jqXHR,textStatus){
                cb(textStatus,null);
            }
        });
    }

    function clear404(cb){
        data.set404PageLoadStatus(false);
        window.localforage.setItem('kiosk-app-404', false, cb);
    }

    function getPhoneGapPath() {
        var path = window.location.pathname;
        path = path.substr( path, path.length - 10 );
        return 'file://' + path;
    }


    return window._connect = {
        checkUrl: checkUrl,
        get404Path: get404Path,
        save404: save404,
        clear404: clear404,
        getPhoneGapPath: getPhoneGapPath
    };
});

