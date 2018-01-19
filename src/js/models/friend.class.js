import userModule from '../module/user.module';
import * as friendModule from '../module/friend.module';

export default class friend {
  constructor(name, photo, id) {
    this.name = name;
    this.photo = photo;
    this.id = id;
  }


	RenderAddedFriendHTML() {
		let bobTheHTMLBuilder = "";
		bobTheHTMLBuilder += `<div class="tooltip">`;
		bobTheHTMLBuilder += `<img src="${this.photo}"></img>`;
		bobTheHTMLBuilder += `<span class="tooltiptext">${this.name}</span>`;
		bobTheHTMLBuilder += `</div>`;

    return bobTheHTMLBuilder;
  }

  RenderNewFacebookFriendsHTML(divNewFriends) {
    var divImg = document.createElement("div");
    divImg.className = "tooltip";
    var img = document.createElement("img");
    img.src = `https://graph.facebook.com/v2.6/${this.id}/picture?type=large`;
    img.className = "addFriend";
    img.setAttribute('tag', this.id);
    var tooltiptext = document.createElement("span");
    tooltiptext.className = "tooltiptext";
    tooltiptext.innerHTML = this.name;
    divImg.appendChild(img);
    divImg.appendChild(tooltiptext);
    divImg.addEventListener('click', function(e) {
      friendModule.UpdateFriendUI(e, divNewFriends, divImg);
    });
		return divImg;
  }


}
