(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.connection', {
        url: '/connection?failed&id&email&mewpipe_token&name',
        views: {
          '@': {
            templateUrl: 'src/app/connection/connection.tpl.html',
            controller: 'ConnectionCtrl as connection',
            resolve: {
              data: function(DataService) {
                return DataService.get();
              }
            }
          }
        }
      })
    ;
  }

  /**
   * @name  ConnectionCtrl
   * @description Controller
   */
  function ConnectionCtrl($scope, $stateParams, AuthService, LocalService) {

    $scope.url = CONFIG.api_url;

    if($stateParams.failed !== undefined ) {

      if($stateParams.failed == 'true') {
        AuthService.failed();
      }

    }

    if($stateParams.failed === undefined && $stateParams.id !== undefined &&
      $stateParams.email !== undefined && $stateParams.mewpipe_token !== undefined && $stateParams.name !== undefined) {

      LocalService.set('mewpipe_user_id', $stateParams.id);
      LocalService.set('mewpipe_user_email', $stateParams.email);
      LocalService.set('mewpipe_token', $stateParams.mewpipe_token);
      LocalService.set('mewpipe_username', $stateParams.name);

      AuthService.success($stateParams.id);

    }

  }

  angular.module('connection', [])
    .config(config)
    .controller('ConnectionCtrl', ['$scope', '$stateParams','AuthService', 'LocalService', ConnectionCtrl]);
})();
