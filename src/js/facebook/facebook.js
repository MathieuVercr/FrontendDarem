var initFacebook = (function(){
  window.fbAsyncInit = function() {
    FB.init({
      appId            : '398917810525601',
      autoLogAppEvents : true,
      xfbml            : true,
      cookie           : true,
      version          : 'v2.11'
    });

    //UPDATE ACCES TOKEN FACEBOOK
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        var accessToken = response.authResponse.accessToken;
        window.sessionStorage.setItem("nmct.facebook.accessToken", accessToken);
      } 
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
})();

module.exports = initFacebook;