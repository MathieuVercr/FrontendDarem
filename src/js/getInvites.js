import challengeRepo from './module/challenge.module';

let getInvites = function(){
  let account = JSON.parse(sessionStorage.getItem('nmct.darem.user'));
  let inviteContainer = document.querySelector('#allNotificiations');

  if(account.challenges.length <= 0){
    inviteContainer.innerHTML = "You have no new challenges";
  }
  console.log(account);
  let inviteHtml = "";
  let idIndex = 0;
  account.challenges.forEach(function(challenge){

    challengeRepo.getChallengeData(challenge._id).then(function(response){
      let challenger = response.acceptedUsers[0];

      inviteHtml += "<section class='invite'>";
      inviteHtml += "<div class='inviteImage'>";
      inviteHtml += "<img src='" + challenger.facebook.photo + "' alt ='" + challenger.facebook.name + "'></div>";
      inviteHtml += "<div class='inviteInfo'>";
      inviteHtml += "<div id='inviteText'>" + challenger.facebook.name + " invited you to go " + challenge.category + "!</div>";
      inviteHtml += "<div id='inviteReply'><div id='accept" + idIndex + "' class='reply' meta='" + response._id + "'>Accept</div><div id='decline" + idIndex + "' class='reply' meta='" + response._id + "'>Decline</div></div>";
      inviteHtml += "</div>";
      inviteHtml += "</section>";

      inviteContainer.innerHTML += inviteHtml;

      let accept = document.querySelector('#accept' + idIndex);
      let decline = document.querySelector('#decline' + idIndex);
      accept.addEventListener('click', function(event){
        answerChallenge(event.path[0].getAttribute('meta'), 'accept');
      });
      decline.addEventListener('click', function(event){
        answerChallenge(event.path[0].getAttribute('meta'), 'decline');
      });
      idIndex += 1;
    });

  });

  function answerChallenge(challengeId, reply){
    let jsonObject = {
      user: account._id,
      challenge: challengeId,
      response: reply
    };
    console.log(jsonObject);
    //challengeRepo.acceptChallenge(jsonObject);

  }
}

module.exports = getInvites;
