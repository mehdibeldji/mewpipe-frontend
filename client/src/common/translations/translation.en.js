(function() {
  'use strict';

  /**
   * @name  EnglishTranslations
   * @description Function
   */
  function EnglishTranslations($translateProvider) {

    $translateProvider.translations('en', {

      HEADER: {
        LANGUAGE: 'Languages',
        SEARCH_VIDEO: 'Search a video'
      },
      HOME: {
        HELLO: 'The best videos',
        FIRST: 'Welcome to MewPipe, your new platform for sharing videos.',
        SECOND: 'Because of us, you will be able to freely share your best instants !' +
        'You can also host your videos without having them accessible by everyone !'
      },
      CONNECTION: {
        TITLE: 'Connection',
        SELECT_EXISTING_ACCOUNT: 'Select an existing account',
        OR_ENTER_OPEN_ID: 'Or enter your OpenID Url',
        SUBMIT: 'Connect',
        LOGOUT: 'Logout',
        PROFILE: 'Profile'
      },
      ADD_VIDEO: {
        TITLE: 'Add a video',
        SUBMIT: 'Send your video',
        FORM: {
          TITLE: 'Title',
          FILE: 'File',
          DESCRIPTION: 'Description',
          PUBLIC: 'Public',
          MEMBER: 'Only to MewPipe members',
          PRIVATE: 'Private',
          ACCESS: 'Access to your video'
        },
        FILENAME: 'Choose your file'
      },
      DISPLAY_VIDEO: {
        POSTED_BY: 'Posted by',
        ADDED: 'Added',
        VIEW: 'View(s)',
        DESCRIPTION: 'Description',
        SHARE: 'Share',
        SHARES: 'Share(s)',
        SHARE_LINK: 'Share link',
        LIKES: 'Like(s)',
        EDIT: 'Edit',
        COPY_LINK: 'Copy',
        DELETE: {
          VALIDATE: 'Are you sure ?',
          VALIDATE_TEXT: 'Do you really want to delete this video ?',
          IS_DELETED: 'Deleted',
          IS_DELETED_TEXT: 'Your video has been deleted !'
        }
      },
      EDIT_VIDEO: {
        TITLE: 'Edit your video',
        SUBMIT: 'Edit'
      },
      MY_VIDEOS: {
        TITLE: 'My videos',
        NO_VIDEO: 'You did not publish any videos yet ... What are you waiting for ?'
      },
      PROFILE: {
        TITLE: 'My Profile',
        IMG_PROFILE: 'Profile picture',
        CHANGE_PROFILE_PICTURE: 'Change my picture',
        FORM: {
          FIRSTNAME: 'Firstname',
          LASTNAME: 'Lastname',
          BIRTHDATE: 'Birthdate'
        },
        SUBMIT_EDIT: 'Edit',
        EDIT: {
          TITLE: 'Profile edited',
          TEXT: 'Your profile has been edited successfully'
        },
        DELETE: {
          TITLE: 'Delete',
          VALIDATE: 'Are you sure ?',
          CANCEL: 'Cancel',
          VALIDATE_TEXT: 'Are you sure you want to delete your account and all of your videos',
          CONFIRM: 'Yes delete it',
          IS_DELETED: 'Deleted',
          IS_DELETED_TEXT: 'Your account has been deleted :-('
        }
      },
      ERROR: {
        CONNECTION: {
          TITLE: 'Oops ...',
          MESSAGE: 'An error occured, please retry'
        },
        UPLOAD: {
          TITLE: 'Oops ...',
          SIZE: {
            TITLE: 'Sorry ...',
            MESSAGE: 'Your video is too heavy: it must not exceed 500 MB!'
          }
        },
        VIDEO: {
          TITLE: 'Oops...',
          MESSAGE: 'This video does not exist...',
          FORBIDDEN: 'You are not authorized to see this video...'
        },
        EDIT_VIDEO: {
          TITLE: 'Oops...',
          TITLE_NOT_OWNER: 'Warning !',
          MESSAGE: 'Please check required fields',
          MESSAGE_NOT_OWNER: 'This isn\'t your video ...'
        },
        PROFILE: {
          TITLE: 'Oops ...',
          MESSAGE: 'You are not allowed to access this page'
        }
      },
      SUCCESS: {
        CONNECTION: {
          TITLE: 'Good !',
          MESSAGE: 'Now you are connected to MewPipe !'
        },
        UPLOAD: {
          TITLE: 'Video uploaded!',
          MESSAGE: 'Your video has been taking into account by our services :-)'
        },
        EDIT_VIDEO: {
          TITLE: 'Video edited',
          MESSAGE: 'Your video has been modified successfully !'
        }
      },
      LOGOUT: {
        CONNECTION: {
          TITLE: 'Logout !',
          MESSAGE: 'We hope to see you soon !'
        }
      }

    });
  }

  angular.module('common.translation.en', ['pascalprecht.translate'])
    .config(EnglishTranslations);

})();
