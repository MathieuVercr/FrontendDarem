var challengeModule = (function(){
	function challengeData(challengeID){
  		var xhr = new XMLHttpRequest();
  		xhr.onreadystatechange = function() {
    		if (xhr.readyState == XMLHttpRequest.DONE) {
      			var myArr = JSON.parse(this.responseText);
      			console.log(myArr);
    		}
  		}
  	xhr.open('GET', 'http://projecthowest.herokuapp.com/challenge/' + challengeID, true);
  	xhr.send();
	}

	return {
		getChallengeData: challengeData
	}
})()

module.exports = challengeModule;