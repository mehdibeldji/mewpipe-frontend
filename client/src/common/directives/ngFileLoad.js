(function() {
  'use strict';

  function ngFileSelectDirective(FileService) {
    return {
      link: function ($scope, el) {

        el.bind('change', function (e) {

          console.log('change');
          $scope.file = (e.srcElement || e.target).files[0];

          FileService.setFile((e.srcElement || e.target).files[0]);
          $scope.getFile();

        });

      }
    };
  }

  angular.module('common.directives.ngfileload', [])
    .directive('ngFileLoad', ['FileService', ngFileSelectDirective]);
})();
