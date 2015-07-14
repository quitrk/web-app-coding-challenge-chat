'use strict';

/* jasmine specs for controllers go here */
describe('services', function () {

  beforeEach(module('chatApp'));

  describe('MessagingService', function () {
    var httpBackend,
        service;

    const API = 'http://coding-challenges.dispatchertrucking.com:8080/chat-messages';

    beforeEach(inject(function (_MessagingService_, $httpBackend) {
      service = _MessagingService_;
      httpBackend = $httpBackend;
    }));

    it('should retrieve messages', function () {
      var messages = ['hello'];

      httpBackend.whenGET(API).respond(messages);

      service.getMessages().then(function (result) {
        expect(result).toEqual(messages);
      });

      httpBackend.flush();
    });

    it('should retrieve messages sorted by time', function () {
      var messages = [
        {
          time: 6
        },
        {
          time: 3
        }
      ];

      httpBackend.whenGET(API).respond(messages);

      service.getMessages().then(function (result) {
        expect(result[0]).toEqual(messages[1]);
        expect(result[1]).toEqual(messages[0]);
      });

      httpBackend.flush();
    });

    it('should retrieve an empty array if no data', function () {
      var messages;

      httpBackend.whenGET(API).respond(messages);

      service.getMessages().then(function (result) {
        expect(result).not.toBeUndefined();
        expect(result.length).toBeFalsy();
      });

      httpBackend.flush();
    });
  });
});