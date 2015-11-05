(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.home', {
        url: '/',
        views: {
          '@': {
            templateUrl: 'src/app/home/home.tpl.html',
            controller: 'HomeCtrl as home',
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
   * @name  HomeCtrl
   * @description Controller
   */
  function HomeCtrl($scope, VideoService, LocalService) {

    var toSend = {
      mewpipe_token: LocalService.get('mewpipe_token')
    };

    var videos = VideoService.getBestVideos(toSend);

    videos.success(function (data) {

      data.forEach(function (el, index) {

        var filename = el.thumbnail;
        var getThumb = VideoService.getThumb(filename);

        getThumb.success(function (thumb) {

          var blobThumb = new Blob([thumb], {type : 'image/png'});
          el.thumbnail = window.URL.createObjectURL(blobThumb);

          if (index === data.length -1) {
            $scope.bestVideos = data;
          }

        })

      });

      if (data.length === 0) {
        $scope.bestVideos = data;
      }

    })
      .error(function (data, err) {
        console.log('data', data);
        console.log('err', err);
        $scope.bestVideos = [];
      });

  }

  angular.module('home', [])
    .config(config)
    .controller('HomeCtrl', ['$scope', 'VideoService', 'LocalService', HomeCtrl]);
})();
