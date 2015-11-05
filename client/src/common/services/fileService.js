(function() {
  'use strict';

  function fileService () {
    var file;
    var fileServiceObj = {};

    fileServiceObj.getFile = function () {
      return file;
    };

    fileServiceObj.setFile = function (newFile) {
      file = newFile;
    };

    return fileServiceObj;
  }

  angular.module('common.services.fileservice', [])
    .factory('FileService', fileService);

})();
