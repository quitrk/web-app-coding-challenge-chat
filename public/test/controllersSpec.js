'use strict';

/* jasmine specs for controllers go here */
describe('controllers', function () {

  beforeEach(module('chatApp'));

  describe('ChatController', function () {
    var scope,
        controller,
        MessagingService,
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

      scope = $rootScope.$new();
      controller = $controller('ChatController', { $scope: scope, MessagingService: MessagingService });
    }));

    describe('Initialization', function () {
      it('should populate chat history with existing messages from server', function() {
        scope.$digest();

        expect(scope.messages).not.toBe(undefined);
        expect(scope.messages.length).toBe(1);
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