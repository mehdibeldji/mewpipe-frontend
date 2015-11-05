(function() {
  'use strict';

  /**
   * @name  TranslationCtrl
   * @description Controller
   */
  function TranslationCtrl($rootScope, $scope, $translate, amMoment) {

    amMoment.changeLocale($translate.use());
    $scope.actualLanguageCode = $translate.use();
    actualLanguageChange($scope);

    $scope.changeLanguage = function (key) {
      $translate.use(key);
      amMoment.changeLocale(key);
      $scope.actualLanguageCode = $translate.use();
      actualLanguageChange($scope);
      $rootScope.$broadcast('change-language-success');
    };

  }

  function actualLanguageChange($scope) {
    if($scope.actualLanguageCode === 'fr') {
      $scope.actualLanguage = 'Français';
    }
    if($scope.actualLanguageCode === 'en') {
      $scope.actualLanguage = 'English';
    }
  }

  angular.module('common.translation', ['pascalprecht.translate', 'angularMoment'])
    .controller('TranslationCtrl',['$rootScope', '$scope', '$translate', 'amMoment', TranslationCtrl]);

})();
