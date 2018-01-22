import createChallenge from './createChallenge';
let pages = {
  createPage: '<section class="createChallenge" id="challenge"><div class="form"><h2>Create challenge</h2><label for="name">Name: </label><br /><input type="text" name="name" id="name" class="form__textinput form-element" /><br /><label for="description">Description: </label><br /><textarea name="description" id="description" class="form__textinput form-element"></textarea><br /><label for="endDate">When does the challenge end? </label><br /><input type="date" name="endDate" id="enddate" class="form__dateinput form-element" /><br /><label for="category">Add some friends:</label><br /><select name="friends" id="addFriendToChallenge" placeholder="Add friends" multiple></select><label for="category">Choose a category:</label><br /><select name="category" id="addCategoryToChallenge" placeholder="Choose a category"></select><button type="submit" name="submit" id="submit" class="form__button form-element submit-invalid" disabled>Create challenge</button><br /></div></section>',
  chatPage: "<h2>Chat with your friends</h2><section><div class='chatSpace'>chat</div><div class='chatbar'><input type='text' placeholder='Type here...'><button>Send</button></div></section>",
  detailPage: "<h2>Details</h2>",
  notificationPage: "<h2>Notifications</h2>"
};

export function initCreate(){
  let article = document.querySelector("#appInformation");
  article.innerHTML = pages.createPage;

  //SHOW CHALLENGE DETAILS
  createChallenge();
  //...
}

export function initDetails(challenge){
  let article = document.querySelector("#appInformation");
  article.innerHTML = pages.detailPage;

  //GET HTML CONTROLS
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
