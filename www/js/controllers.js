angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,MFPClientPromise,$timeout) {
  MFPClientPromise.then(function(){
    //alert('done with fn');
    //APP_DISPLAY_NAME,APP_SERVICES_URL,ENVIRONMENT,LOGIN_DISPLAY_TYPE,POSTFIX_APP_SERVICES_URL,POSTFIX_WORKLIGHT_ROOT_URL,WORKLIGHT_ROOT_URL
    //alert(WL.StaticAppProps.WORKLIGHT_ROOT_URL+'  test');
    $timeout(function(){
        WL.Logger.debug('Hello world!');
        WL.Logger.send();
    },1000);
  });
})

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
