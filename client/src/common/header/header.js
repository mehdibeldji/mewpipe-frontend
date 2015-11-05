(function() {
  'use strict';

  function checkIsLogged($scope, LocalService) {

    if(LocalService.get('mewpipe_token') !== null) {

      $scope.isLogged = true;
      $scope.userId = LocalService.get('mewpipe_user_id');
      $scope.userEmail = LocalService.get('mewpipe_user_email');
      $scope.username = LocalService.get('mewpipe_username');
      $scope.profileImgUrl = LocalService.get('mewpipe_profile_img_url');

      if($scope.profileImgUrl == null || $scope.profileImgUrl == 'null') {
        $scope.profileImgUrl = CONFIG.defaultImgPath;
      }

    }

  }

  function accountDeleted ($scope)
  {
    $scope.isLogged = false;
  }

  function headerCtrl($log, $scope, $state, LocalService, AuthService) {
    $log.debug('Header loaded');

    checkIsLogged($scope, LocalService);

    $scope.$on('login-success-event', function() {
      checkIsLogged($scope, LocalService);
    });

    $scope.$on('delete-account', function() {
      accountDeleted($scope);
    });

    $scope.logout = function() {

      LocalService.clear();
      $scope.isLogged = false;
      AuthService.logout();
      $state.go('root.home');

    };

    $('.button-collapse').sideNav();

  }

  angular.module('common.header', [])
    .controller('HeaderCtrl', ['$log', '$scope', '$state', 'LocalService',
                                'AuthService', headerCtrl]);
})();
