(function(global){

    var fUtils = {
        rootPath: null,
        getFileSystem: function(cb){
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
                cb(null,fileSystem);
            }, function(event){
                alert("reguestFileSystem error: "+event.target.error.code);
                cb(event.target.error.code, null);
            });
        },
        getRootPath: function(fileSystem, cb){
            var that = this;
            if(this.rootPath){
                cb(null, this.rootPath);
                return;
            }
            fileSystem.root.getFile("dummy.html", {create: true, exclusive: false},
                function gotFileEntry(fileEntry){
                    that.rootPath = fileEntry.fullPath.replace("dummy.html","");
                    alert("dumy file: "+fileEntry.fullPath);
                    fileEntry.remove();
                    cb(null, that.rootPath +"kiosk-wrapper/");
                }
            );


            /////
//            fileSystem.root.getDirectory( "kiosk-wrapper", {create:true, exclusive: false},
//                function(directory) {
//                    that.rootPath = directory;
//                    alert("root path: "+ JSON.stringify(directory));
//                    cb(null, directory);
//                },
//                function(err){
//                    alert("get root err:" + JSON.stringify(arguments));
//                    cb(err.code, null);
//                });
            //////

        },
        downloadFile: function(url, dest, cb){
            var fileTransfer = new FileTransfer();
            fileTransfer.download(url, dest,
                function(theFile) {
                    cb(null, theFile.toURL());
                },
                function(error) {
                    alert("upload error code: " + JSON.stringify(error));
                    cb(error.code, null);
                }, true
            );
        }
    };
    global.fUtils = fUtils;
})(window);