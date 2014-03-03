'use strict';

/* Controllers */

function AuthCtrl($scope, $rootScope, data, connect) {

    var $authPopup = $("#auth_popup");

    $scope.user="admin";
    $scope.pass="admin";

    $scope.login = function(){
        if(data.login($scope.user, $scope.pass)){
            $authPopup.modal("hide");
            $rootScope.$broadcast("settings:open");
        }
    };

    window.addEventListener("message",function(e){
        if(e.data == "settings:open"){
            $authPopup.modal("show");
        }
    },false);

}
