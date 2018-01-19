import * as friendModule from '../module/friend.module';

var initFacebook = (function() {
  window.fbAsyncInit = function() {
    FB.init({
      appId: '398917810525601',
      autoLogAppEvents: true,
      xfbml: true,
      cookie: true,
      version: 'v2.11'
    });

    //UPDATE ACCES TOKEN FACEBOOK
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        var accessToken = response.authResponse.accessToken;
        sessionStorage.setItem("nmct.facebook.accessToken", accessToken);
        if (sessionStorage.getItem('nmct.darem.user')) {
          getFriendsList();
        }
      }
    });
  };

  let getFriendsList = function() {
    FB.api('/me/friends', function(response) {
      let obj = JSON.parse(sessionStorage.getItem('nmct.darem.user'));
      var newFriends = [];
      for (let i = 0; i < response.data.length; i++) {
        if (!JSON.stringify(obj.friends).includes(response.data[i].id)) {
          newFriends.push(response.data[i]);
        }
      }
      showInSidePanel(newFriends);

      function showInSidePanel(newFriends) {
        console.log("REFRESH!");
        let divNewFriends = document.getElementById("newFriends");
        friendModule.ShowNotAddedFriends(divNewFriends, newFriends);
      }
    });
  };




  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
})();

module.exports = initFacebook;
