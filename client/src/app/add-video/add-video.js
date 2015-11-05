(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.add-video', {
        url: '/add-video',
        views: {
          '@': {
            templateUrl: 'src/app/add-video/add-video.tpl.html',
            controller: 'AddVideoCtrl as addVideo',
            resolve: {
              data: function(DataService) {
                return DataService.get();
              }
            }
          }
        }
      });
  }

  /**
   * @name  AddVideoCtrl
   * @description Controller
   */
  function AddVideoCtrl($scope, $translate, $state, VideoService, LocalService) {

    $scope.valueFileName = $translate.instant('ADD_VIDEO.FILENAME');
    var maxSize = 524288000;

    $scope.$watch('files', function() {

      if($scope.files !== undefined && $scope.files.length == 0)
      {
        $scope.files = undefined;
      }

      if($scope.files && $scope.files.length) {

        if ($scope.files[0].size > maxSize)
        {
          sweetAlert($translate.instant('ERROR.UPLOAD.SIZE.TITLE'), $translate.instant('ERROR.UPLOAD.SIZE.MESSAGE'), 'error');
          $scope.files = undefined;
          $scope.valueFileName = $translate.instant('ADD_VIDEO.FILENAME');
        }
        else
        {
          $scope.valueFileName = $scope.files[0].name;
        }

      }

    });

    $scope.uploadVideo = function() {

      console.log('user id', LocalService.get('mewpipe_user_id'));
      var toSend = {
          mewpipe_token: LocalService.get('mewpipe_token'),
          user_id: LocalService.get('mewpipe_user_id'),
          title: $scope.title,
          description: $scope.description,
          profile_id: $scope.profile,
          file: $scope.files[0]
      };

      VideoService.set(toSend, function (progress){

        console.log(progress);

      }, function (err, data) {
        if(err)
        {
          sweetAlert($translate.instant('ERROR.UPLOAD.TITLE'), err, 'error');
        }
        else {

          sweetAlert({
              title: $translate.instant('SUCCESS.UPLOAD.TITLE'),
              text: $translate.instant('SUCCESS.UPLOAD.MESSAGE'),
              type: 'success',
              showCancelButton: false,
              confirmButtonText: 'Ok',
              closeOnConfirm: true
            },
            function(){
              $state.go('root.display-video', {videoId: data.id});
            });

        }

      });

    };

  }

  angular.module('add-video', [])
    .config(config)
    .controller('AddVideoCtrl', ['$scope', '$translate', '$state', 'VideoService',
                                  'LocalService', AddVideoCtrl]);
})();
