(function() {
  'use strict';

  /**
   * @name  FrenchTranslations
   * @description Function
   */
  function FrenchTranslations($translateProvider) {

    $translateProvider.translations('fr', {

      HEADER: {
        LANGUAGE: 'Langues',
        SEARCH_VIDEO: 'Rechercher une vidéo'
      },
      HOME: {
        HELLO: 'Les meilleures vidéos',
        FIRST: 'Bienvenue sur MewPipe, votre nouvelle plateforme de partage de vidéos.',
        SECOND: 'Grâce à nous, vous aller pouvoir partager gratuitement vos meilleurs moments !' +
        'Vous pouvez aussi héberger vos vidéos sans qu\'elles soient visibles par le grand public !'
      },
      CONNECTION: {
        TITLE: 'Connexion',
        SELECT_EXISTING_ACCOUNT: 'Sélectionnez un compte existant',
        OR_ENTER_OPEN_ID: 'Ou entrez votre URL OpenID',
        SUBMIT: 'Se connecter',
        LOGOUT: 'Déconnexion',
        PROFILE: 'Profil'
      },
      ADD_VIDEO: {
        TITLE: 'Ajouter une vidéo',
        SUBMIT: 'Envoyer votre vidéo',
        FORM: {
          TITLE: 'Titre',
          FILE: 'File',
          DESCRIPTION: 'Description',
          PUBLIC: 'Publique',
          MEMBER: 'Uniquement aux membres MewPipe',
          PRIVATE: 'Privée',
          ACCESS: 'Accès à votre vidéo'
        },
        FILENAME: 'Choisissez un fichier'
      },
      DISPLAY_VIDEO: {
        POSTED_BY: 'Postée par',
        ADDED: 'Ajoutée',
        VIEW: 'Vue(s)',
        DESCRIPTION: 'Description',
        SHARE: 'Partager',
        SHARES: 'Partage(s)',
        SHARE_LINK: 'Lien de partage',
        LIKES: 'Coup(s) de coeur',
        EDIT: 'Edit',
        COPY_LINK: 'Copier',
        DELETE: {
          VALIDATE: 'Êtes vous sûr ?',
          VALIDATE_TEXT: 'Voulez vous vraiment supprimer cette vidéo ?',
          IS_DELETED: 'Supprimé',
          IS_DELETED_TEXT: 'Votre vidéo a été supprimé !'
        }
      },
      EDIT_VIDEO: {
        TITLE: 'Editer votre vidéo',
        SUBMIT: 'Éditer'
      },
      MY_VIDEOS: {
        TITLE: 'Mes vidéos',
        NO_VIDEO: 'Vous n\'avez pas encore publié de vidéo ... Qu\'attendez-vous ?'
      },
      PROFILE: {
        TITLE: 'Mon profil',
        IMG_PROFILE: 'Photo de profil',
        CHANGE_PROFILE_PICTURE: 'Changer ma photo',
        FORM: {
          FIRSTNAME: 'Prénom',
          LASTNAME: 'Nom',
          BIRTHDATE: 'Date de naissance'
        },
        SUBMIT_EDIT: 'Editer',
        EDIT: {
          TITLE: 'Profil édité',
          TEXT: 'Votre profil a été édité avec succès'
        },
        DELETE: {
          TITLE: 'Supprimer',
          VALIDATE: 'Êtes vous sûr ?',
          CANCEL: 'Annuler',
          VALIDATE_TEXT: 'Voulez vous vraiment supprimer votre compte et toutes vos vidéos ?',
          CONFIRM: 'Oui, supprimer',
          IS_DELETED: 'Supprimé',
          IS_DELETED_TEXT: 'Votre compte a été supprimé :-('
        }
      },
      ERROR: {
        CONNECTION: {
          TITLE: 'Oops ...',
          MESSAGE: 'Une erreur est survenue, merci de réessayer'
        },
        UPLOAD: {
          TITLE: 'Oops ...',
          SIZE: {
            TITLE: 'Désolé ...',
            MESSAGE: 'Votre vidéo est trop lourde : Elle ne doit pas dépasser 500 Mo !'
          }
        },
        VIDEO: {
          TITLE: 'Oops...',
          MESSAGE: 'Cette vidéo n\'existe pas...',
          FORBIDDEN: 'Vous n\'êtes pas autorisé à voir cette vidéo...'
        },
        EDIT_VIDEO: {
          TITLE: 'Oops...',
          TITLE_NOT_OWNER: 'Attention !',
          MESSAGE: 'Merci de vérifier les champs renseignés',
          MESSAGE_NOT_OWNER: 'Ceci n\'est pas votre vidéo voyons ...'
        },
        PROFILE: {
          TITLE: 'Oops ...',
          MESSAGE: 'Vous n\'êtes pas autorisé à accéder à cette page'
        }
      },
      SUCCESS: {
        CONNECTION: {
          TITLE: 'Félicitations !',
          MESSAGE: 'Vous êtes maintenant connecté à MewPipe !'
        },
        UPLOAD: {
          TITLE: 'Vidéo envoyée!',
          MESSAGE: 'Votre vidéo a bien été prise en compte par nos services :-)'
        },
        EDIT_VIDEO: {
          TITLE: 'Vidéo éditée',
          MESSAGE: 'Votre vidéo a été modifiée avec succès !'
        }
      },
      LOGOUT: {
        CONNECTION: {
          TITLE: 'Déconnexion !',
          MESSAGE: 'Nous espérons vous revoir bientôt !'
        }
      }


    });

    $translateProvider.preferredLanguage('fr');

  }

  angular.module('common.translation.fr', ['pascalprecht.translate'])
    .config(FrenchTranslations);

})();
