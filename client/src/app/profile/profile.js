(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($sailsProvider, $stateProvider) {

    // Socket.io configuration
    $sailsProvider.config.transport = ['websocket'];
    $sailsProvider.url = CONFIG.socketIoUrl;

    $stateProvider
      .state('root.profile', {
        url: '/profile/{userId}',
        views: {
          '@': {
            templateUrl: 'src/app/profile/profile.tpl.html',
            controller: 'ProfileCtrl as profile',
            resolve: {
              data: function(DataService) {
                return DataService.get();
              }
            }
          }
        }
      });
  }

  function changeDatePicker($translate) {

    var language = $translate.use(),
        monthsFull = [],
        monthsShort = [],
        weekdaysShort = [],
        weekdaysFull = [],
        weekdaysLetter = [],
        today = '',
        clear = '',
        close = '',
        now = Date.now();

    console.log($translate.use());

    if(language == 'fr')
    {

      weekdaysFull = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
      weekdaysShort = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      monthsFull = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      monthsShort = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
      weekdaysLetter = [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ];
      today = 'Aujourd\'hui';
      clear = 'Effacer';
      close = 'Fermer';

    }
    else {

      weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      weekdaysLetter = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ];
      today = 'Today';
      clear = 'Clear';
      close = 'Close';

    }

    // Active DatePicker
    $('#birthdate').pickadate({
      selectMonths: true,
      selectYears: 80,
      max: now,
      format: 'd mmmm yyyy',
      monthsFull: monthsFull,
      monthsShort: monthsShort,
      weekdaysShort: weekdaysShort,
      weekdaysFull: weekdaysFull,
      weekdaysLetter: weekdaysLetter,
      today: today,
      clear: clear,
      close: close
    });

  }

  /**
   * @name  ProfileCtrl
   * @description Controller
   */
  function ProfileCtrl($rootScope, $scope, $translate, $state, UserService, LocalService, FileReader, $sails, $timeout) {

    changeDatePicker($translate);

    $scope.$on('change-language-success', function() {
      changeDatePicker($translate);
    });

    var stateUserId = $state.params.userId;

    if(stateUserId == LocalService.get('mewpipe_user_id')) {

      var userProfile = UserService.get(stateUserId);

      userProfile.success(function (data) {

        $scope.img_profile = data.profile_img_url;
        if(data.birthdate != null) {
          $scope.birthdate = data.birthdate;
          document.getElementById('birthdate').value = $scope.birthdate;
        }
        $scope.firstname = data.firstname;
        $scope.lastname = data.lastname;

        // Get Profile Picture
        $scope.getFile = function () {
          FileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {
              $scope.img_profile = result;
            });
        };

        $scope.editProfile = function () {

          $scope.birthdate = document.getElementById('birthdate').value;
          var toSend = {
              mewpipe_token: LocalService.get('mewpipe_token'),
              id: stateUserId,
              has_file: 0
            },
            blob = {};

          if($scope.firstname !== null) {
            toSend.firstname = $scope.firstname
          }
          if($scope.lastname !== null) {
            toSend.lastname = $scope.lastname;
          }
          if($scope.birthdate !== '') {
            toSend.birthdate = $scope.birthdate;
          }

          if($scope.file !== undefined) {
            toSend.has_file = 1;
            blob = FileReader.dataURIToBlob($scope.img_profile);
            blob.name = $scope.file.name;
          }

          var editUser = UserService.update(toSend, blob);

          editUser.success(function (data) {
            swal($translate.instant('PROFILE.EDIT.TITLE'), $translate.instant('PROFILE.EDIT.TEXT'), 'success');
          })
            .error(function (data, error) {
              console.log('data', data);
              console.log('err', err);
              swal($translate.instant('ERROR.CONNECTION.TITLE'), $translate.instant('ERROR.CONNECTION.MESSAGE'), 'error');
            });

        };

        $sails.on("photoUpdated", function (message) {
          if(parseInt(message.userId) == stateUserId)
          {
            $timeout(function(){
              LocalService.set('mewpipe_profile_img_url', message.profileImgUrl);
              $rootScope.$broadcast('login-success-event');
            }, 5000);
          }

        });

        $scope.deleteProfile = function() {
          swal({
            title: $translate.instant('PROFILE.DELETE.VALIDATE'),
            text: $translate.instant('PROFILE.DELETE.VALIDATE_TEXT'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: $translate.instant('PROFILE.DELETE.CONFIRM'),
            cancelButtonText: $translate.instant('PROFILE.DELETE.CANCEL'),
            closeOnConfirm: false
          }, function(){

            var destroy = {
              mewpipe_token: LocalService.get('mewpipe_token'),
              id: parseInt(stateUserId)
            };

            var destroyUser = UserService.destroy(destroy);
            destroyUser.success(function () {
                LocalService.clear();
                $state.go('root.home');
                $rootScope.$broadcast('delete-account');
                swal($translate.instant('PROFILE.DELETE.IS_DELETED'), $translate.instant('PROFILE.DELETE.IS_DELETED_TEXT'), 'success');
            })
              .error(function (data, err) {
                console.log('data', data);
                console.log('err', err);
              });

          });
        };

      })
        .error(function (data, err) {

          console.log('data', data);
          console.log('err', err);
          swal($translate.instant('ERROR.CONNECTION.TITLE'), $translate.instant('ERROR.CONNECTION.MESSAGE'), 'error');

        });

    }
    else {

      $state.go('root.home');
      swal($translate.instant('ERROR.PROFILE.TITLE'), $translate.instant('ERROR.PROFILE.MESSAGE'), 'error');
    }

  }

  angular.module('profile', ['ngSails'])
    .config(['$sailsProvider', '$stateProvider', config])
    .controller('ProfileCtrl', ['$rootScope', '$scope', '$translate', '$state',
                                'UserService', 'LocalService', 'FileReader', '$sails',
                                '$timeout', ProfileCtrl]);
})();
