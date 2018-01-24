import challengeRepo from './module/challenge.module';

let getInvites = function(){
  let account = JSON.parse(sessionStorage.getItem('nmct.darem.user'));
  let inviteContainer = document.querySelector('#allNotificiations');

  if(account.challenges.length <= 0){
    inviteContainer.innerHTML = "You have no new challenges";
  }

  let inviteHtml = "";
  let indexId = 0;
  let loaded = [];
  account.challenges.forEach(function(challenge){
    challengeRepo.getChallengeData(challenge._id).then(function(response){
      loaded.push(response);

      if(account.challenges.length == loaded.length){
        loaded.forEach(function(challenge){
          let challenger = challenge.acceptedUsers[0];

          inviteHtml += "<section class='invite'>";
          inviteHtml += "<div class='inviteImage'>";
          inviteHtml += "<img src='" + challenger.facebook.photo + "' alt ='" + challenger.facebook.name + "'></div>";
          inviteHtml += "<div class='inviteInfo'>";
          inviteHtml += "<div id='inviteText'>" + challenger.facebook.name + " invited you to go " + challenge.category + "!</div>";
          inviteHtml += "<div id='inviteReply'><div id='accept" + indexId + "' class='reply accept' meta='" + challenge._id + "' tag='accept' userid='" + account._id + "'>Accept</div>";
          inviteHtml += "<div id='decline" + indexId + "' class='reply decline' meta='" + challenge._id + "' tag='decline' userid='" + account._id + "'>Decline</div></div>";
          inviteHtml += "</div>";
          inviteHtml += "</section>";

          inviteContainer.innerHTML += inviteHtml;
          inviteHtml = "";



/*
          console.log("index: " + indexId);
          let accept = document.getElementById('accept' + indexId);
          let decline = document.getElementById('decline' + indexId);
          console.log(accept);
          accept.onclick = function(event){
            console.log("ACCEPT");
            answerChallenge(event.path[0].getAttribute('meta'), 'accept');
          }
          decline.onclick = function(event){
            console.log("DECLINE");
            answerChallenge(event.path[0].getAttribute('meta'), 'decline');
          }
*/
          indexId++;
        });
      }
    });
  });
}

module.exports = getInvites;
