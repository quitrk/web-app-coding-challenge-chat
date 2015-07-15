(function () {
  /* global angular, _ */
  'use strict';

  var services = angular.module('services', ['ngResource']);

  services.service('AuthService',
    function () {
      this.getCurrentUser = function () {
        return {
          name: 'Tudor'
        };
      };
    }
  );

  services.service('MessagingService', ['$resource', '$http', '$q', 'AuthService',
    function ($resource, $http, $q, AuthService) {
      const API = 'http://coding-challenges.dispatchertrucking.com:8080/chat-messages';

      this.getMessages = function () {
        var defer = $q.defer();

        $http.get(API)
          .then(function (result) {
            if (!result.data || !result.data.length) {
              defer.resolve([]);
            } else {
              defer.resolve(_.sortBy(result.data, 'time'));
            }
          }, function (error) {
            defer.reject(error);
          });

        return defer.promise;
      };

      this.sendMessage = function (message) {
        $http.post(API, {
          user: AuthService.getCurrentUser().name,
          text: message
        });
      };
    }
  ]);
}());