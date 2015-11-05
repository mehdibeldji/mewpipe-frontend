(function() {
  'use strict';

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
  });

  function config($stateProvider, $urlRouterProvider, $logProvider, $httpProvider, cfpLoadingBarProvider) {
    $urlRouterProvider.otherwise('/');
    $logProvider.debugEnabled(true);
    $httpProvider.interceptors.push('AuthInterceptor');
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common.accept = 'application/json';

    $stateProvider
      .state('root', {
        views: {
          'header': {
            templateUrl: 'src/common/header/header.tpl.html',
            controller: 'HeaderCtrl'
          },
          'footer': {
            templateUrl: 'src/common/footer/footer.tpl.html',
            controller: 'FooterCtrl'
          }
        }
      });

    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
  }

  function MainCtrl($log) {
    $log.debug('MainCtrl loaded!');

  }

  function run($log) {
    $log.debug('App is running!');
  }

  angular.module('app', [
      /* MODULES */
      'ui.router',
      'angular-loading-bar',
      /* END MODULES */

      /* TRANSLATIONS */
      'common.translation',
      'common.translation.en',
      'common.translation.fr',
      /* END TRANSLATIONS */

      /* CONTROLLERS */
      'home',
      'getting-started',
      'connection',
      'add-video',
      'display-video',
      'my-videos',
      'edit-video',
      'profile',
      'shared-video',
      /* END CONTROLLERS */

      /* HEADER AND FOOTER */
      'common.header',
      'common.footer',
      /* END HEADER AND FOOTER */

      /* SERVICES */
      'common.services.data',
      'common.services.localstorage',
      'common.services.authservice',
      'common.services.video',
      'common.services.userservice',
      'common.services.filereader',
      'common.services.fileservice',
      /* END SERVICES */

      /* DIRECTIVES */
      'common.directives.version',
      'common.directives.ngfileload',
      /* END DIRECTIVES */

      /* FILTERS */
      'common.filters.uppercase',
      /* END FILTERS */

      /* DIVERS */
      'common.interceptors.http',
      'common.interceptors.auth',
      /* END DIVERS */
      'templates'
    ])
    .config(config)
    .run(run)
    .controller('MainCtrl', MainCtrl)
    .value('version', '1.0.4');
})();
