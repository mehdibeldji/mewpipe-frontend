(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($sailsProvider, $stateProvider) {

    // Socket.io configuration
    $sailsProvider.config.transport = ['websocket'];
    $sailsProvider.url = CONFIG.socketIoUrl;

    $stateProvider
      .state('root.my-videos', {
        url: '/my-videos',
        views: {
          '@': {
            templateUrl: 'src/app/my-videos/my-videos.tpl.html',
            controller: 'MyVideosCtrl as myVideos',
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
  function MyVideosCtrl($scope, $state, VideoService, LocalService, $sails) {

    var userId = LocalService.get('mewpipe_user_id');

    if(userId !== undefined)
    {
      var myVideos = VideoService.getMyVideos(userId);

      myVideos.success(function(data) {

        data.forEach(function (el, index) {

          var filename = el.thumbnail;
          var getThumb = VideoService.getThumb(filename);

          getThumb.success(function (thumb) {

            var blobThumb = new Blob([thumb], {type : 'image/png'});
            el.thumbnail = window.URL.createObjectURL(blobThumb);

            if(index === data.length - 1)
            {
              $scope.videos = data;
            }

          });

        });

        $sails.on("videoEncoded", function (message) {

          data.forEach(function (video, index) {
            if(parseInt(message) === video.id)
            {

              video.encoded = true;

            }
          });

        });

        if(data.length === 0)
        {
          $scope.videos = data;
        }

      })
        .error(function(date, err) {

          console.log(err);

        });

    }

  }

  angular.module('my-videos', ['ngSails'])
    .config(['$sailsProvider', '$stateProvider', config])
    .controller('MyVideosCtrl', ['$scope', '$state', 'VideoService', 'LocalService',
                                  '$sails', MyVideosCtrl]);
})();
