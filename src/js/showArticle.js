import createChallenge from './createChallenge';
import getInvites from './getInvites';
import challengeRepo from './module/challenge.module';
import * as GeneralSockets from './socket/general.socket.io';
let pages = {
  createPage: '<section class="createChallenge" id="challenge"><div class="form"><h2>Create challenge</h2><label for="name">Name: </label><br /><input type="text" name="name" id="name" class="form__textinput form-element" /><br /><label for="description">Description: </label><br /><textarea name="description" id="description" class="form__textinput form-element"></textarea><br /><label for="endDate">When does the challenge end? </label><br /><input type="date" name="endDate" id="enddate" class="form__dateinput form-element" /><br /><label for="category">Add some friends:</label><br /><select name="friends" id="addFriendToChallenge" placeholder="Add friends" multiple></select><label for="category">Choose a category:</label><br /><select name="category" id="addCategoryToChallenge" placeholder="Choose a category"></select><button type="submit" name="submit" id="submit" class="form__button form-element submit-invalid" disabled>Create challenge</button><br /></div></section>',
  chatPage: "<h2>Chat with your friends</h2><section><div class='chatSpace'>chat</div><div class='chatbar'><input type='text' placeholder='Type here...'><button>Send</button></div></section>",
  detailPage: '<section id="detailAndChat"><section class="showDetail" id="showDetail"></section><section class="chatInterface"><section><div class="chatSpace" id="chatSpace"></div><div class="chatbar"><input type="text" placeholder="Type here..." id="message"><button id="sendMessage">Send</button><button id="sendPhoto">Photo</button><input id="fileInput" type="file" style="display:none;" /></div></section></section></section>',
  invitePage: "<h2>Notifications</h2><section id='allNotificiations'></section>"
};
let chatScriptLoaded = false;

export function initCreate(){
  let article = document.querySelector("#appInformation");
  article.innerHTML = pages.createPage;
  createChallenge();
}

export function initDetails(response){
  if(!chatScriptLoaded){
    let article = document.querySelector("#appInformation");
    article.innerHTML = pages.detailPage;
    GeneralSockets.chatSocket();
    chatScriptLoaded = true;
  }
  var date = new Date(parseInt(response.endDate));
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();
  var year = date.getUTCFullYear();

  var bobTheHTMLBuilder = "";
  bobTheHTMLBuilder += '<div id="detailImage"><img id="detailCategory" src="./assets/images/' + response.category.toLowerCase() + '.png"></img></div>';
  bobTheHTMLBuilder += '<div class="challengeDetail">';
  bobTheHTMLBuilder += '<h2>' + response.name.toUpperCase() + '</h2>';
  bobTheHTMLBuilder += '<strong>Challenge description: </strong><p id="detailDescription">' + response.description + '</p>';
  bobTheHTMLBuilder += '<strong>You need to finish before </strong><p id="detailEndDate">' + day + '/' + month + '/' + year + '</p>';
  bobTheHTMLBuilder += '<strong>Competitors: </strong><div class="friendsDetail">';
  console.log(response.acceptedUsers.length);
  for (var i = 0; i < response.acceptedUsers.length; i++) {
    bobTheHTMLBuilder += '<img src="https://graph.facebook.com/v2.6/' + response.acceptedUsers[i].facebook.id + '/picture?type=large"></img>';
  }
  bobTheHTMLBuilder += '</div></div>';
  bobTheHTMLBuilder += '<button type="submit"  id="chatButton"><marquee>Complete challenge</marquee></button>'
  var detail = document.getElementById("showDetail");
  detail.innerHTML = bobTheHTMLBuilder;
}

export function initChat(){
  let article = document.querySelector("#appInformation");
  article.innerHTML = pages.chatPage;
}

export function initInvite(){
  let article = document.querySelector("#appInformation");
  article.innerHTML = pages.invitePage;

  getInvites();

  let container = document.querySelector('#allNotificiations');
  container.addEventListener('click', function(event){
    let element = event.path[0];
    if(element.getAttribute('meta')!==null){
      answerChallenge(element.getAttribute('userid'), element.getAttribute('meta'), element.getAttribute('tag'));
    }
  });

}

function answerChallenge(userId, challengeId, reply){
  let jsonObject = {
    user: userId,
    challenge: challengeId,
    response: reply
  };
  console.log(jsonObject);
  challengeRepo.acceptChallenge(jsonObject);

}
