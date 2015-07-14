'use strict';

/* jasmine specs for controllers go here */
describe('controllers', function () {
var $compile,
    $rootScope;

  beforeEach(module('chatApp'));
  beforeEach(module('angularMoment'));

  describe('momentFormatter', function () {
    beforeEach(inject(function(_$compile_, _$rootScope_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function() {
      var date = new Date().getTime();

      var element = $compile("<span moment-formatter='" + date + "''></span>")($rootScope);
      $rootScope.$digest();
 
      expect(element.html()).toContain("ago");
    });
  });
});
