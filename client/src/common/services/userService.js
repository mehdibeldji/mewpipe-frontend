(function() {
  'use strict';

  function userService($upload, $http) {

    return {

      get: function(user_id)
      {
        return $http.get(CONFIG.api_url + 'users/' + user_id);
      },
      update: function(toSend, profilePicture) {

        return $upload.upload({
          url: CONFIG.api_url + 'users/update/'+ toSend.id,
          method: 'POST',
          fields: toSend,
          file: profilePicture
        });

      },
      destroy: function(toSend)
      {
        return $http.delete(CONFIG.api_url + 'users/destroy/' + toSend.id);
      }

    };

  }

  angular.module('common.services.userservice', ['angularFileUpload'])
    .factory('UserService', ['$upload', '$http', userService]);

})();
