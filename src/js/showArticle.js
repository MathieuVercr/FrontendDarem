import createChallenge from './createChallenge';
let pages = {
  createPage: '<section class="createChallenge" id="challenge"><div class="form"><h2>Create challenge</h2><label for="name">Name: </label><br /><input type="text" name="name" id="name" class="form__textinput form-element" /><br /><label for="description">Description: </label><br /><textarea name="description" id="description" class="form__textinput form-element"></textarea><br /><label for="endDate">When does the challenge end? </label><br /><input type="date" name="endDate" id="enddate" class="form__dateinput form-element" /><br /><label for="category">Add some friends:</label><br /><select name="friends" id="addFriendToChallenge" placeholder="Add friends" multiple></select><label for="category">Choose a category:</label><br /><select name="category" id="addCategoryToChallenge" placeholder="Choose a category"></select><button type="submit" name="submit" id="submit" class="form__button form-element submit-invalid" disabled>Create challenge</button><br /></div></section>',
  chatPage: "<h2>Chat with your friends</h2><section><div class='chatSpace'>chat</div><div class='chatbar'><input type='text' placeholder='Type here...'><button>Send</button></div></section>",
  detailPage: '<section id="detailAndChat"><section class="showDetail" id="showDetail"></section><section class="chatInterface"><section><div class="chatSpace">chat</div><div class="chatbar"><input type="text" placeholder="Type here..."><button>Send</button></div></section></section></section>',
  notificationPage: "<h2>Notifications</h2>"
};

export function initCreate(){
  let article = document.querySelector("#appInformation");
  article.innerHTML = pages.createPage;

  //SHOW CHALLENGE DETAILS
  createChallenge();
  //...
}

export function initDetails(response){
  let article = document.querySelector("#appInformation");
  article.innerHTML = pages.detailPage;

  var date = new Date(parseInt(response.endDate));
  var bobTheHTMLBuilder = "";
  bobTheHTMLBuilder += '<div id="detailImage"><img id="detailCategory" src="./assets/images/' + response.category.toLowerCase() + '.png"></img></div>';
  bobTheHTMLBuilder += '<div class="challengeDetail">';
  bobTheHTMLBuilder += '<h2>' + response.name.toUpperCase() + '</h2>';
  bobTheHTMLBuilder += '<strong>Challenge description: </strong><p id="detailDescription">' + response.description + '</p>';
  bobTheHTMLBuilder += '<strong>You need to finish before </strong><p id="detailEndDate">' + date.getDay() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + '</p>';
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

export function initNotifications(){
  let article = document.querySelector("#appInformation");
  article.innerHTML = pages.notificationPage;
}
