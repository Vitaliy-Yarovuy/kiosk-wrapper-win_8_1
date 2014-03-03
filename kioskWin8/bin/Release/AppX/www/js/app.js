(function(global, undefined){
    var $loadPage,$framePage,$settingPage,$authPopup;

    $framePage = $("#frame_page");
    $loadPage = $("#load_page");

    global.app = angular.module('kioskApp',[]);

    app.run(function($rootScope, connect, data, notify){
        async.detect(data.getSettings().servers,connect.checkUrl,function(result){
            if(result){
               loadFrame(null,result.url);
            } else {
                connect.get404Path(loadFrame);
            }
            if(data.getSettings().isClearCookies && window.cookies && window.cookies.clear){
                window.cookies.clear(function() { console.log('Cookies cleared!');});
            }
        });


        window.addEventListener("message", function (e) {
            if(e.data == "notification:fire"){
                notify.notify();
            }
        },false);

        function loadFrame(err, src) {
            //src = "https://github.com"
            if(data.getSettings().isClearCache){
                src += "?"+Math.random();
            }
            $framePage.bind("error",function(e){
                console.log("error",e);
            });
            $framePage.bind("MSWebViewDOMContentLoaded", function (e) {
                console.log(e);
                setTimeout(function(){
                    $loadPage.addClass("close-on");
                },1000);
            });
            $framePage.prop("src", src);
        }
    });

    document.addEventListener('deviceready', function(){
        console.log("deviceready");
    }, false);


    window.onerror = function(){
        alert("error: "+JSON.stringify(arguments));
    }

})(window);

// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
