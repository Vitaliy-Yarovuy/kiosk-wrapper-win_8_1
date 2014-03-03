'use strict';

app.factory('data',function ($rootScope){
    var defaultData = {
            auth:{
                login: "admin",
                pass: "admin"
            },
            settings:{
                isClearCookies: false,
                isClearCache: false,
                notification: "all",
                servers:[
                    { url: "http://kiosk-fake-server.herokuapp.com/", timeout: 7 }
                ]
            },
            is404PageLoad:false
        },
        data = loadData(defaultData);

    function loadData(defaultData){
        var dataStr = window.localStorage["kiosk-app-data"];
        if(dataStr){
            return JSON.parse(dataStr);
        }
        return defaultData;
    }

    function saveData(data){
        window.localStorage["kiosk-app-data"] = JSON.stringify(data);
    }

    return {
        login: function(login, pass){
            return data.auth.login == login && data.auth.pass == pass;
        },
        getSettings: function(){
            return data.settings;
        },
        getAuth: function(){
            return data.auth;
        },
        setSettings: function(sets){
            data.settings = sets;
            saveData(data);
        },
        resetSettings: function(){
            data = defaultData;
            saveData(data);
        },
        setAuth: function(auth){
            data.auth = auth;
            saveData(data);
        },
        get404PageLoadStatus: function(){
            return data.is404PageLoad;
        },
        set404PageLoadStatus: function(isLoad){
            data.is404PageLoad = isLoad;
            saveData(data);
        }
    };
});