var challengeModule = (function() {
  var data;

  function challengeData(challengeID) {
    if (!challengeID) throw new Error('IDNOTFOUND');

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
      xmlhttp.open('GET', 'http://projecthowest.herokuapp.com/challenge/' + challengeID, true);
      xmlhttp.send();
    });

    return p;
  }

  function addChallenge(challenge) {
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
      xmlhttp.open('POST', 'https://projecthowest.herokuapp.com/challenge/add', true);
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      var json = JSON.stringify(challenge);
      xmlhttp.send(json);
    });
    return p;
  }

  return {
    getChallengeData: challengeData,
    addChallenge: addChallenge
  }
})()

module.exports = challengeModule;
