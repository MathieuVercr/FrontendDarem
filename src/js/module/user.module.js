var userModule = (function(){
	function createUser(accessToken){
  		var xhr = new XMLHttpRequest();
  		xhr.onreadystatechange = function() {
    		if (xhr.readyState == XMLHttpRequest.DONE) {
      			getUserData(xhr.responseText);
    		}
  		}
  	xhr.open('POST', 'https://projecthowest.herokuapp.com/users/auth/facebook/token?access_token=' + accessToken, true);
 	xhr.send();
	}

	function getUserData(token){
  		var xhr = new XMLHttpRequest();
  		xhr.onreadystatechange = function() {
    		if (xhr.readyState == XMLHttpRequest.DONE) {
      			var myArr = JSON.parse(this.responseText);
      			console.log(myArr[0]);
      			sessionStorage.setItem("nmct.darem.user", JSON.stringify(myArr));
      			window.location.href = "./challenge.html";
    		}
  		}
  	xhr.open('GET', 'http://projecthowest.herokuapp.com/users/userprofile?authToken=' + token, true);
  	xhr.send();
	}

	return {
		createUser: createUser,
		getUserData: getUserData
	}
})()

module.exports = userModule;