
let pages = {
  createPage: "<h2>Create your challenges</h2><form class='createChallenge' action='#' method='post'><p><label for='Name'>Challenge Name</label><input type='text' name='Name' class='challengeFields'/></p><p><label for='Description'>Challenge Description</label><input type='text' name='Description'  class='challengeFields'/></p><p><label for='Category'>Pick a category</label><label for='addFriends'>Add Friends</label></p><input type='submit' name='submit' value='Submit'></form>",
  chatPage: "<h2>Chat with your friends</h2><section><div class='chatSpace'>chat</div><div class='chatbar'><input type='text' placeholder='Type here...'><button>Send</button></div></section>",
  detailPage: "<h2>Details</h2>",
  notificationPage: "<h2>Notifications</h2>"
};

export function initCreate(){
  let article = document.querySelector("#appInformation");
  article.innerHTML = pages.createPage;
}

export function initDetails(challenge){
  let article = document.querySelector("#appInformation");
  article.innerHTML = pages.detailPage;

  //GET HTML CONTROLS
  //...

  //SHOW CHALLENGE DETAILS
  //...

}

export function initChat(){
  let article = document.querySelector("#appInformation");
  article.innerHTML = pages.chatPage;
}

export function initNotifications(){
  let article = document.querySelector("#appInformation");
  article.innerHTML = pages.notificationPage;
}
