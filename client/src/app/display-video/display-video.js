(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config(ngClipProvider, $sailsProvider, $stateProvider, $httpProvider) {
    ngClipProvider.setPath(CONFIG.clipboardPath);
    // Socket.io configuration
    $sailsProvider.config.transport = ['websocket'];
    $sailsProvider.url = CONFIG.socketIoUrl;

    $stateProvider
      .state('root.display-video', {
        url: '/video/{videoId}',
        views: {
          '@': {
            templateUrl: 'src/app/display-video/display-video.tpl.html',
            controller: 'DisplayVideoCtrl as displayVideo',
            resolve: {
              data: function(DataService) {
                return DataService.get();
              }
            }
          }
        }
      })
      .state('root.video-share', {
        url: '/videos/{share}/{videoId}',
        views: {
          '@': {
            templateUrl: 'src/app/display-video/display-video.tpl.html',
            controller: 'DisplayVideoCtrl as displayVideo',
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

  function getVideo($scope, $translate, video, $sce, VideoService, mewpipeUserId, $http, $state, vgFullscreen, LocalService, FileReader) {

    if(mewpipeUserId == null || video.id === undefined)
    {
      $scope.cantVote = true;
    }

    if($state.params.share !== undefined)
    {

      var updateSharedVideo = {
        id: video.id,
        nb_shared: video.nb_shared + 1,
        score: video.score + 1
      };

      VideoService.update(updateSharedVideo);

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
        var blobThumb = new Blob([dataThumb], {type : 'image/png'});
        var srcUrlThumb = window.URL.createObjectURL(blobThumb);

        blobjectVideo.success(function (dataVideo) {

          var blobVideo = new Blob([dataVideo], {type : "video/mp4"});
          var srcUrl = window.URL.createObjectURL(blobVideo);

          $scope.config = {
            preload: 'none',
            sources: [
              {src: $sce.trustAsResourceUrl(srcUrl), type: 'video/mp4' }/*,
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


        if(mewpipeUserId == video.user_id.id) {
          $scope.canEditAndDelete = true;

          $scope.deleteVideo = function() {

            swal({
              title: $translate.instant('DISPLAY_VIDEO.DELETE.VALIDATE'),
              text: $translate.instant('DISPLAY_VIDEO.DELETE.VALIDATE_TEXT'),
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: $translate.instant('PROFILE.DELETE.CONFIRM'),
              cancelButtonText: $translate.instant('PROFILE.DELETE.CANCEL'),
              closeOnConfirm: false
            }, function() {

              var destroy = {
                mewpipe_token: LocalService.get('mewpipe_token'),
                id: video.id
              };

              var destroyVideo = VideoService.destroy(destroy);
              destroyVideo.success(function () {
                $state.go('root.my-videos');
                swal($translate.instant('DISPLAY_VIDEO.DELETE.IS_DELETED'), $translate.instant('DISPLAY_VIDEO.DELETE.IS_DELETED_TEXT'), 'success');
              })
                .error(function (data, err) {
                  console.log('data', data);
                  console.log('err', err);
                });

            });

          }
        }

        // Like/Dislike
        $scope.likeOrDislike = function() {
          if($scope.iconLike === 'mdi-action-favorite') {
            dislikeVideo($scope, $http, video, LocalService);
          } else {
            likeVideo($scope, $http, video, LocalService);
          }
        };

        // View video
        var viewBloqued = false;
        $scope.updateViews = function () {

          if(!viewBloqued) {
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

      if(video.user_id.profile_img_url == null) {
        $scope.profileImgUrl = '/assets/images/user-icon.jpg';
      } else {
        $scope.profileImgUrl = video.user_id.profile_img_url;
      }

      if(dataLike) {
        $scope.iconLike = 'mdi-action-favorite';
      } else {
        $scope.iconLike = 'mdi-action-favorite-outline';
      }

      if (video.profile_id.name === 'PrivateLink')
      {

        var toSend = {
          video_id: video.id,
          sharePage: false
        };

        var getPrivateLink = VideoService.getPrivateLink(toSend);

        getPrivateLink.success(function (data) {
          $scope.shareLink = CONFIG.frontUrl + 'share/' + data.link;
        })
          .error(function(data, err) {
            console.log('data', data);
            console.log('err', err);
          });

      }
      else
      {
        $scope.shareLink = CONFIG.frontUrl + 'videos/share/' + video.id;
      }

    })
      .error(function(dataLike, err) {
        sweetAlert($translate.instant('ERROR.VIDEO.TITLE'), $translate.instant('ERROR.VIDEO.MESSAGE'), 'error');
        $state.go('root.home');
      });
  }

  /**
   * @name  DisplayVideoCtrl
   * @description Controller
   */
  function DisplayVideoCtrl($scope, $sce, $state, $http, $translate, VideoService, LocalService, vgFullscreen, $sails, FileReader) {

    var token = LocalService.get('mewpipe_token'),
        video = VideoService.get($state.params.videoId);

    video.success(function(data) {

      $sails.on("videoEncoded", function (message) {
        if(parseInt(message) === data.id)
        {
          $scope.isEncoded = true;
          data.encoded = true;
          getVideo($scope, $translate, data, $sce, VideoService, mewpipeUserId, $http, $state, vgFullscreen, LocalService, FileReader);
        }
      });

      var mewpipeUserId = LocalService.get('mewpipe_user_id');

      if(data.profile_id.name === 'PrivateLink' && token !== null) {

        if(data.user_id.id === parseInt(mewpipeUserId)) {

          getVideo($scope, $translate, data, $sce, VideoService, mewpipeUserId, $http, $state, vgFullscreen, LocalService, FileReader);

        } else {

          sweetAlert($translate.instant('ERROR.VIDEO.TITLE'), $translate.instant('ERROR.VIDEO.FORBIDDEN'), 'error');
          $state.go('root.home');

        }

      }else if ((data.profile_id.name === 'MewPipeUsers' && token !== null) || data.profile_id.name === 'Public'){

        getVideo($scope, $translate, data, $sce, VideoService, mewpipeUserId, $http, $state, vgFullscreen, LocalService, FileReader);

      } else {

        sweetAlert($translate.instant('ERROR.VIDEO.TITLE'), $translate.instant('ERROR.VIDEO.FORBIDDEN'), 'error');
        $state.go('root.home');

      }
    })
      .error(function (data, err) {

        sweetAlert($translate.instant('ERROR.VIDEO.TITLE'), $translate.instant('ERROR.VIDEO.MESSAGE'), 'error');
        $state.go('root.home');

      });

  }

  angular.module('display-video', ['ngSanitize', 'com.2fdevs.videogular', 'com.2fdevs.videogular.plugins.controls', 'ngSails',
                                    'com.2fdevs.videogular.plugins.overlayplay','com.2fdevs.videogular.plugins.poster', 'ngClipboard'])
    .config(['ngClipProvider', '$sailsProvider', '$stateProvider', '$httpProvider', config])
    .controller('DisplayVideoCtrl', ['$scope', '$sce', '$state', '$http',
                                      '$translate', 'VideoService', 'LocalService', 'vgFullscreen', '$sails', 'FileReader', DisplayVideoCtrl]);
})();
