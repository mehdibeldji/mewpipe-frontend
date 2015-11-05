(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.edit-video', {
        url: '/video/edit/{videoId}',
        views: {
          '@': {
            templateUrl: 'src/app/edit-video/edit-video.tpl.html',
            controller: 'EditVideoCtrl as editVideo',
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
   * @name  EditVideoCtrl
   * @description Controller
   */
  function EditVideoCtrl($scope, $translate, $state, VideoService, LocalService) {

    var token = LocalService.get('mewpipe_token'),
        user_id = LocalService.get('mewpipe_user_id');

    if (token !== null)
    {
      var video_id = $state.params.videoId;
      var video = VideoService.get(video_id);

      video.success(function (data) {

        if (user_id == data.user_id.id) {

          $scope.title = data.title;
          $scope.description = data.description;
          $scope.profile = data.profile_id.id;

          $scope.editVideo = function () {

            var toSend = {
              id: video_id,
              title: $scope.title,
              description: $scope.description,
              profile_id: $scope.profile
            };

            if(toSend.title !== undefined && toSend.profile_id > 0) {
              var edit = VideoService.update(toSend);

              edit.success(function (data) {

                if(toSend.profile_id == 3) {

                  var createLink = {
                    video_id: toSend.id,
                    user_id: user_id
                  };

                  var newPrivateLink = VideoService.createPrivateLink(createLink);

                  newPrivateLink.error(function() {
                    console.log('error create private link');
                  });

                }

                sweetAlert($translate.instant('SUCCESS.EDIT_VIDEO.TITLE'), $translate.instant('SUCCESS.EDIT_VIDEO.MESSAGE'), 'success');
                $state.go('root.my-videos');

              })
                .error(function (data, err) {
                  console.log('data', data);
                  console.log('err', err);
                });
            }
            else {
              sweetAlert($translate.instant('ERROR.EDIT_VIDEO.TITLE'), $translate.instant('ERROR.EDIT_VIDEO.MESSAGE'), 'error');
            }

          };

        }
        else {
          sweetAlert($translate.instant('ERROR.EDIT_VIDEO.TITLE_NOT_OWNER'), $translate.instant('ERROR.EDIT_VIDEO.MESSAGE_NOT_OWNER'), 'error');
        }

      })
        .error(function (data, err) {
          console.log(data);
          console.log(err);
        });

    }

  }

  angular.module('edit-video', [])
    .config(config)
    .controller('EditVideoCtrl', ['$scope', '$translate', '$state', 'VideoService',
                                  'LocalService', EditVideoCtrl]);
})();
