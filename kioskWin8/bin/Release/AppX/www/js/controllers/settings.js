'use strict';

/* Controllers */

function SettingsCtrl($scope, $rootScope, data, connect) {

    var $settingPage = $("#settings_page");
    var $p404Popup = $("#p404_popup");
    var $frame404Page = $("#frame_404_page");

    $scope.availableNotifications = [
        { name:"none", id:"none" },
        { name:"vibro", id:"vibro" },
        { name:"sound", id:"sound" },
        { name:"all", id:"all" }
    ];
    $scope.settings = {};
    $scope.auth = {};
    $scope.url404 = "http://kiosk-fake-server.herokuapp.com/404.html";

    $scope.$on('settings:open', function() {
        $scope.settings = data.getSettings();
        $scope.auth = data.getAuth();
        $settingPage.addClass("open-on");
    });

    $scope.close = function(){
        $settingPage.removeClass("open-on");
        data.setSettings($scope.settings);
    };

    $scope.removeServers = function(index){
        $scope.settings.servers.splice(index);
    };

    $scope.addServer = function(){
        $scope.settings.servers.push({url:"",timeout:7});
    };

    $scope.load404page = function(btn){
        var $btn = $(btn);
        $btn.addClass('disabled');
        $btn.html('loading ...');
        connect.save404($scope.url404,function(err,value){
            if(err){
                alert("loading: "+err);
            }
            $btn.removeClass('disabled');
            $btn.html('load');
        });
    };

    $scope.open404page = function(){
        $frame404Page.bind("load", function(){
            $frame404Page.unbind("load");
            $p404Popup.modal("show");
        });
        connect.get404Path(function(err, path){
            $frame404Page.attr("src",path);
        })
    };
    $scope.clear404page = function(){
        connect.clear404(function(){
            alert("page 404 restored to default");
        });
    };

    window.addEventListener("message",function(e){
        if(e.data == "settings:reset"){
            data.resetSettings();
        }
    },false);

    window._settings = $scope;
}
