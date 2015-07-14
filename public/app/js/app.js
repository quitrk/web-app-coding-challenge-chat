'use strict';

/* App Module */
var chatApp = angular.module('chatApp', [
  'ngRoute',
  'angularMoment',
  'doowb.angular-pusher',
  'services',
  'controllers',
  'directives'
]);

chatApp.config(['$routeProvider', 'PusherServiceProvider', function ($routeProvider, PusherServiceProvider) {
  $routeProvider.
    when('/', {
      templateUrl: './templates/chat.html',
      controller: 'ChatController'
    }).
    otherwise({
      redirectTo: '/'
    });
  
  PusherServiceProvider
    .setToken('be0cb4958ed00f849ac9')
    .setOptions({});
}]);