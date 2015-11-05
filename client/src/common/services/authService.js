(function() {
  'use strict';

  function authService($rootScope, $translate, $state, $http, LocalService) {

    return {

      success: function(id) {

        var getUser = $http.get(CONFIG.api_url + 'users/' + id);

        getUser.success(function(data) {
          LocalService.set('mewpipe_profile_img_url', data.profile_img_url);
          $rootScope.$broadcast('login-success-event');
        })
          .error(function(data, err) {
              console.log('data', data);
              console.log('err', err);
          });

        sweetAlert({
            title: $translate.instant('SUCCESS.CONNECTION.TITLE'),
            text: $translate.instant('SUCCESS.CONNECTION.MESSAGE'),
            type: 'success',
            showCancelButton: false,
            confirmButtonText: 'Ok',
            closeOnConfirm: true
          },
          function(){
            $state.go('root.home');
          });

      },
      failed: function() {
        sweetAlert($translate.instant('ERROR.CONNECTION.TITLE'), $translate.instant('ERROR.CONNECTION.MESSAGE'), 'error');
      },
      logout: function() {
        sweetAlert($translate.instant('LOGOUT.CONNECTION.TITLE'), $translate.instant('LOGOUT.CONNECTION.MESSAGE'), 'error');
      }

    };

  }

  angular.module('common.services.authservice', [])
    .factory('AuthService', ['$rootScope', '$translate', '$state', '$http',
                              'LocalService', authService]);

})();

