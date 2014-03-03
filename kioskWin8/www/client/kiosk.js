(function(){
    var size,kioskWrapperClient,
        openStep = 0,
        points = [{x:"left",y:"top"},{x:"right",y:"top"},{x:"right",y:"bottom"},{x:"left",y:"bottom"}];

    function wndSize(){
        var w = 0;var h = 0;
        //IE
        if(!window.innerWidth){
            if(!(document.documentElement.clientWidth == 0)){
                //strict mode
                w = document.documentElement.clientWidth;h = document.documentElement.clientHeight;
            } else{
                //quirks mode
                w = document.body.clientWidth;h = document.body.clientHeight;
            }
        } else {
            //w3c
            w = window.innerWidth;h = window.innerHeight;
        }
        return {width:w,height:h};
    }

    document.addEventListener("click",function(e){
        var point = points[openStep],
            x = e.x,
            y = e.y;
        if(!size){
            size = wndSize();
        }

        if((point.x == "left" && x < 0.2 * size.width) || (point.x == "right" && x > 0.8 * size.width)){
            if((point.y == "top" && y < 0.2 * size.height) || (point.y == "bottom" && y > 0.8 * size.height)){
                if(points.length <= ++openStep){
                    kioskWrapperClient.openSettings();
                }
                return false;
            }
        }
        openStep = 0;
    });

    kioskWrapperClient = {
        openSettings:function(){
            parent.window.postMessage("settings:open", "*");
        },
        resetSettings:function(){
            parent.window.postMessage("settings:reset", "*");
        },
        notificationFire:function(){
            parent.window.postMessage("notification:fire", "*");
        }
    };
    window.kioskWrapperClient = kioskWrapperClient;
})();