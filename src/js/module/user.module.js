var userModule = (function(){
  var data;

	function createUser(accessToken){
    if(!accessToken) throw new Error('ACCESSTOKENTOKENNOTFOUND');

    var p = new Promise((ok, nok) => {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onerror = (err) => {
        nok(err);
      }
      xmlhttp.onload = (res) => {
        if (xmlhttp.readyState === 4) {
          data = xmlhttp.responseText;
          ok(data);
        }
      }
    xmlhttp.open('POST', 'https://projecthowest.herokuapp.com/users/auth/facebook/token?access_token=' + accessToken, true);
    xmlhttp.send();
    });

    return p;
	}

	function getUserData(token){
    if(!token) throw new Error('TOKENNOTFOUND');

    var p = new Promise((ok, nok) => {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onerror = (err) => {
        nok(err);
      }
      xmlhttp.onload = (res) => {
        if (xmlhttp.readyState === 4) {
          data = JSON.parse(xmlhttp.responseText);
          ok(data);
        }
      }
    xmlhttp.open('GET', 'http://projecthowest.herokuapp.com/users/userprofile?authToken=' + token, true);
    xmlhttp.send();
    });
    return p;
	}

  function addFriend(userID, friendID){
    if(!userID || !friendID) throw new Error('USERANDFRIENDIDNOTFOUND');

    var p = new Promise((ok, nok) => {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onerror = (err) => {
        nok(err);
      }
      xmlhttp.onload = (res) => {
        if (xmlhttp.readyState === 4) {
          data = xmlhttp.responseText;
          ok(data);
        }
      }
    xmlhttp.open('POST', 'https://projecthowest.herokuapp.com/users/friends/add', true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var json = JSON.stringify({ userOne: userID, userTwo: friendID })
    xmlhttp.send(json);
    });
    return p;
  }

	return {
		createUser: createUser,
		getUserData: getUserData,
    addFriend: addFriend
	}
})()

module.exports = userModule;
