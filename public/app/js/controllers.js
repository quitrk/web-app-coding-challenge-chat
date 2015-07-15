(function () {
  /* global angular */
  'use strict';

  var controllers = angular.module('controllers', []);

  controllers.controller('ChatController', ['$scope', 'Pusher', 'MessagingService',
    function($scope, Pusher, MessagingService) {
      MessagingService.getMessages()
        .then(function (messages) {
          $scope.messages = messages;
        })
        .catch(function (error) {
          //handle through a NotificationService
        });

      Pusher.subscribe('chat-messages').then(function (channel) {
        channel.bind('new_message', function (message) {
          $scope.messages.push(message);
        });
      });

      $scope.sendMessage = function () {
        var message = $scope.message;

        if (message) {
          MessagingService.sendMessage(message);
          $scope.message = '';
        }
      };
    }
  ]);
}());