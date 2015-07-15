'use strict';

/* jasmine specs for controllers go here */
describe('controllers', function () {

  beforeEach(module('chatApp'));

  describe('ChatController', function () {
    var scope,
        controller,
        MessagingService,
        Pusher,
        messages = [{}];

    beforeEach(inject(function ($rootScope, $controller, $q) {
      MessagingService = {
        getMessages: function () {
          var defer = $q.defer();
          defer.resolve(messages);
          return defer.promise;
        },
        sendMessage: function (param) {}
      };

      Pusher = (function () {
        var channel = {
          events: [],

          bind: function (eventName, callback) {
            var callback;
            var eventObj = _.find(this.events, function (event) {
              return event === eventName;
            });

            if (!eventObj) {
              this.events.push({
                event: eventName,
                callbacks: [ callback ]
              });
            } else {
              callback = _.find(eventObj.callbacks, function (method) {
                return callback === method;
              });

              if (!callback) {
                eventObj.callbacks.push(callback);
              }
            }
          },

          send: function (eventName, param) {
            var eventObj = _.find(this.events, function (eventItem) {
              return eventItem.event === eventName;
            });

            if (eventObj) {
              eventObj.callbacks.forEach(function (callback) {
                callback(param);
              });
            }
          }
        };

        return {
          trigger: function (eventName, param) {
            channel.send(eventName, param);
          },

          subscribe: function () {
            var defer = $q.defer();
            defer.resolve(channel);
            return defer.promise;
          }
        }
      }()),

      scope = $rootScope.$new();
      controller = $controller('ChatController', { $scope: scope, MessagingService: MessagingService, Pusher: Pusher });
    }));

    describe('Initialization', function () {
      it('should populate chat history with existing messages from server', function() {
        scope.$digest();

        expect(scope.messages).not.toBe(undefined);
        expect(scope.messages.length).toBe(1);
      });
    });

    describe('Pusher service subscription', function () {
      it('should add new message to messages list when new_message event gets triggered.', function () {
        var message = 'some message';
        var exists;

        scope.$digest();

        Pusher.trigger('new_message', message);

        exists = _.find(scope.messages, function (msg) {
          return msg === message; 
        });

        expect(exists).toBeTruthy();
      });
    });

    describe('sendMessage', function () {
      it('should send a message if message not empty, and clear scope message.', function () {
        var message = 'test';
        scope.message = message;

        spyOn(MessagingService, 'sendMessage');

        scope.sendMessage();
        scope.$digest();

        expect(MessagingService.sendMessage).toHaveBeenCalledWith(message);
        expect(scope.message).not.toBeTruthy();
      });

      it('should not send a message if message is empty', function () {
        var message = '';
        scope.message = message;

        spyOn(MessagingService, 'sendMessage');

        scope.sendMessage();
        scope.$digest();

        expect(MessagingService.sendMessage).not.toHaveBeenCalled();
      });
    });
  });
});