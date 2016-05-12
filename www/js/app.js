// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,MFPClientPromise) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    MFPClientPromise.then(function(){WL.Logger.ctx({pkg: 'io.ionic'}).debug('mfp and ionic are ready, safe to use WL.* APIs');});
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})
/*ibm mfp plugin factory*/
.factory('MFPClientPromise', function($q){
  return window.MFPClientDefer.promise;
})

window.Messages = {
  // Add here your messages for the default language.
  // Generate a similar file with a language suffix containing the translated messages.
  // key1 : message1,
};

window.wlInitOptions = {
  onSuccess:connected,
  onFailure:notconnected
};
function connected(response){
    alert('connected');
}

function notconnected(response){
    WL.Logger.debug('not connected');
}
window.MFPClientDefer = angular.injector(['ng']).get('$q').defer();;
window.wlCommonInit = window.MFPClientDefer.resolve;
window.MFPClientDefer.promise.then(function wlCommonInit(){
  // Common initialization code goes here or use the angular service MFPClientPromise
  mfpMagicPreviewSetup();
  WL.Logger.debug("inside wlCommonInit");
          WL.Logger.debug('Hello world!');

          WL.Logger.send();
 });

function mfpMagicPreviewSetup(){
  var platform;
  if(WL.StaticAppProps.ENVIRONMENT === 'preview'){
    platform = WL.StaticAppProps.PREVIEW_ENVIRONMENT === 'android' ? 'android' : 'ios';
    if(location.href.indexOf('?ionicplatform='+platform) < 0){
      location.replace(location.pathname+'?ionicplatform='+platform);
    }
  }
}
