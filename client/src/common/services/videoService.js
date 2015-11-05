(function() {
  'use strict';

  function videoService ($http, $upload) {
    return {
      get: function (id) {
        return $http.get(CONFIG.api_url + 'videos/' + id);
      },
      getThumb: function (filename) {
        return $http.get(CONFIG.url_thumbnail + filename, {responseType: 'arraybuffer', 'Content-Type': undefined});
      },
      getVideo: function (filename) {
        return $http.get(CONFIG.url_video + filename, {responseType: 'arraybuffer', 'Content-Type': undefined})
      },
      set: function (toSend, callbackProgress, callbackResult) {

        var uploadVideo = $upload.upload({
          url: CONFIG.api_url + 'videos/create',
          method: 'POST',
          fields: toSend,
          file: toSend.file
        });

        uploadVideo.progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          callbackProgress(progressPercentage);
          console.log('progress: ' + progressPercentage + '% ' +
          evt.config.file.name);
        })
          .success(function(data) {
            callbackResult(null, data);
          })
          .error(function(data, error) {
            callbackResult(error, null);
          });

      },
      unset: function (id) {

      },
      update: function (toSend) {
        return $http.put(CONFIG.api_url + 'videos/' + toSend.id, toSend);
      },
      destroy: function(toSend) {
        return $http.delete(CONFIG.api_url + 'videos/destroy/' + toSend.id);
      },
      getMyVideos: function(user_id) {
        return $http.get(CONFIG.api_url + 'videos?user_id=' + user_id);
      },
      incrementNbViews: function(video_id, toSend) {
        return $http.post(CONFIG.api_url + 'videos/'+ video_id, toSend);
      },
      isLikedByUser: function(user_id, video_id) {
        return $http.post(CONFIG.api_url + 'videos/isLikedByUser', {user_id: user_id, video_id: video_id});
      },
      createPrivateLink: function(toSend) {
        return $http.post(CONFIG.api_url + 'privateLinks/create', toSend);
      },
      getPrivateLink: function(toSend) {
        return $http.post(CONFIG.api_url + 'privateLinks/find', toSend);
      },
      getBestVideos: function(toSend) {
        return $http.post(CONFIG.api_url + 'videos/bestScore', toSend);
      }
    };
  }

  angular.module('common.services.video', ['angularFileUpload'])
    .factory('VideoService', ['$http', '$upload', videoService]);

})();
