(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config(ngClipProvider, $stateProvider, $httpProvider) {
    ngClipProvider.setPath(CONFIG.clipboardPath);
    $stateProvider
      .state('root.share', {
        url: '/share/{link}',
        views: {
          '@': {
            templateUrl: 'src/app/display-video/display-video.tpl.html',
            controller: 'ShareCtrl as share',
            resolve: {
              data: function(DataService) {
                return DataService.get();
              }
            }
          }
        }
      });

  }

  function likeVideo($scope, $http, video, LocalService) {
    $scope.iconLike = 'mdi-action-favorite';
    var likePost =  $http.post(CONFIG.api_url + 'videos/like', {
      video_id: video.id,
      user_id: video.user_id.id,
      mewpipe_token: LocalService.get('mewpipe_token')
    });
    likePost.success(function(data) {
      $scope.iconLike = 'mdi-action-favorite';
      $scope.nbLike += 1;
    });
  }

  function dislikeVideo($scope, $http, video, LocalService) {
    $scope.iconLike = 'mdi-action-favorite-outline';
    var dislikePost = $http.post(CONFIG.api_url + 'videos/dislike', {
      video_id: video.id,
      user_id: video.user_id.id,
      mewpipe_token: LocalService.get('mewpipe_token')
    });
    dislikePost.success(function(data) {
      $scope.iconLike = 'mdi-action-favorite-outline';
      $scope.nbLike -= 1;
    });
  }

  function getVideo($scope, $translate, video, $sce, VideoService, mewpipeUserId, $http, $state, vgFullscreen, LocalService) {

    if(mewpipeUserId == null || video.id === undefined)
    {
      $scope.cantVote = true;
    }

    // Init collapsible
    $('document').ready(function() {
      $('.collapsible').collapsible({
        accordion : false
      });
    });

    var like = VideoService.isLikedByUser(mewpipeUserId, video.id);
    like.success(function(dataLike) {

      var urlThumb = CONFIG.url_thumbnail + video.thumbnail;
      var blobjectThumb = $http.get(urlThumb, {responseType: 'arraybuffer', 'Content-Type': undefined});

      blobjectThumb.success(function (dataThumb) {

        var urlVideo = CONFIG.url_video + video.name + '.mp4';
        var blobjectVideo = $http.get(urlVideo, {responseType: 'arraybuffer', 'Content-Type': undefined});
        var blobThumb = new Blob([dataThumb], {type: 'image/png'});
        var srcUrlThumb = window.URL.createObjectURL(blobThumb);

        blobjectVideo.success(function (dataVideo) {

          var blobVideo = new Blob([dataVideo], {type: "video/mp4"});
          var srcUrl = window.URL.createObjectURL(blobVideo);

          $scope.config = {
            preload: 'none',
            sources: [
              {src: $sce.trustAsResourceUrl(srcUrl), type: 'video/mp4'}/*,
               {src: $sce.trustAsResourceUrl(urlVideo + '.webm'), type: 'video/webm'},
               {src: $sce.trustAsResourceUrl(urlVideo + '.ogg'), type: 'video/ogg'}*/
            ],
            theme: {
              url: 'http://www.videogular.com/styles/themes/default/latest/videogular.css'
            },
            plugins: {
              poster: srcUrlThumb
            }
          };

        });

        if (mewpipeUserId == video.user_id.id) {
          $scope.canEdit = true;
        }



        // Like/Dislike
        $scope.likeOrDislike = function () {
          if ($scope.iconLike === 'mdi-action-favorite') {
            dislikeVideo($scope, $http, video, LocalService);
          } else {
            likeVideo($scope, $http, video, LocalService);
          }
        };

        // View video
        var viewBloqued = false;
        $scope.updateViews = function () {

          if (!viewBloqued) {
            var updateNbViews = {
                nb_views: video.nb_views + 1,
                score: video.score + 1
              },
              incrementNbViews = VideoService.incrementNbViews(video.id, updateNbViews);

            incrementNbViews.success(function (data) {
              $scope.nbViews += 1;
              viewBloqued = true;
            })
              .error(function (data, err) {
                console.log('err', err);
              });
          }

        };

      });

      $scope.id = video.id;
      $scope.title = video.title;
      $scope.description = video.description;
      $scope.nbViews = video.nb_views;
      $scope.nbLike = video.nb_like;
      $scope.nbShared = video.nb_shared;
      $scope.createdAt = video.createdAt;
      $scope.username = video.user_id.name;
      $scope.isEncoded = video.encoded;
      $scope.shareLink = CONFIG.frontUrl + 'share/' + $state.params.link;

      if (video.user_id.profile_img_url == null) {
        $scope.profileImgUrl = '/assets/images/user-icon.jpg';
      } else {
        $scope.profileImgUrl = video.user_id.profile_img_url;
      }

      if (dataLike) {
        $scope.iconLike = 'mdi-action-favorite';
      } else {
        $scope.iconLike = 'mdi-action-favorite-outline';
      }


    })
      .error(function(dataLike, err) {
        sweetAlert($translate.instant('ERROR.VIDEO.TITLE'), $translate.instant('ERROR.VIDEO.MESSAGE'), 'error');
        $state.go('root.home');
      });
  }

  /**
   * @name  ShareCtrl
   * @description Controller
   */
  function ShareCtrl($scope, $sce, $state, $http, $translate, VideoService, LocalService, vgFullscreen) {

    var toSend = {
        link: $state.params.link,
        sharePage: true
      },
      video = VideoService.getPrivateLink(toSend);

    video.success(function(data) {

      var mewpipeUserId = LocalService.get('mewpipe_user_id');

      getVideo($scope, $translate, data, $sce, VideoService, mewpipeUserId, $http, $state, vgFullscreen, LocalService);

    })
      .error(function (data, err) {

        sweetAlert($translate.instant('ERROR.VIDEO.TITLE'), $translate.instant('ERROR.VIDEO.MESSAGE'), 'error');
        $state.go('root.home');

      });

  }

  angular.module('shared-video', ['ngSanitize', 'com.2fdevs.videogular', 'com.2fdevs.videogular.plugins.controls',
                                    'com.2fdevs.videogular.plugins.overlayplay','com.2fdevs.videogular.plugins.poster', 'ngClipboard'])
    .config(['ngClipProvider', '$stateProvider', '$httpProvider', config])
    .controller('ShareCtrl', ['$scope', '$sce', '$state', '$http',
                                      '$translate', 'VideoService', 'LocalService', 'vgFullscreen', ShareCtrl]);
})();
