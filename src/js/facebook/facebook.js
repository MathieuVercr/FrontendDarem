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
        sessionStorage.setItem("nmct.facebook.accessToken", accessToken);
        getFriendsList();
      } 
    });
  };

  let getFriendsList = function() {
    FB.api('/me/friends', function(response) {
      let obj = JSON.parse(sessionStorage.getItem('nmct.darem.user'));
      var newFriends = [];
      for(let i = 0; i < response.data.length; i++){
        if(!JSON.stringify(obj.friends).includes(response.data[i].id)){
            newFriends.push(response.data[i]);
            console.log(response);
        }
      }
      showInSidePanel(newFriends);

      function showInSidePanel(newFriends){
        let divNewFriends = document.getElementById("newFriends");
        newFriends.forEach((friend) => {
            var divImg = document.createElement("div");
            divImg.className = "tooltip";
            var img = document.createElement("img");
            img.src = `https://graph.facebook.com/v2.6/${friend.id}/picture?type=large`;
            img.className = "addFriend";
            img.setAttribute('tag', friend.id);
            var tooltiptext = document.createElement("span");
            tooltiptext.className = "tooltiptext";
            tooltiptext.innerHTML = friend.name;
            divImg.appendChild(img);
            divImg.appendChild(tooltiptext);
            divNewFriends.appendChild(divImg);
            divImg.addEventListener('click', function(e) {
              console.log(e.target.attributes.tag.nodeValue);
            });
        });
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