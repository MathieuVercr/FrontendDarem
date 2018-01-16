import userModule from '../module/user.module';
import Friend from '../models/friend.class';

export default class friend{
	constructor(name, photo, id){
		this.name = name;
		this.photo = photo;
		this.id = id;
	}


	RenderAddedFriendHTML(divFriends){
		var divImg = document.createElement("div");
	    divImg.className = "tooltip";
	    var img = document.createElement("img");
	    img.src = this.photo;
	    var tooltiptext = document.createElement("span");
	    tooltiptext.className = "tooltiptext";
	    tooltiptext.innerHTML = this.name;
	    divImg.appendChild(img);
	    divImg.appendChild(tooltiptext);
	    divFriends.appendChild(divImg);
	}

	RenderNewFacebookFriendsHTML(divNewFriends){
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
        divNewFriends.appendChild(divImg);
        divImg.addEventListener('click', function(e) {
        	userModule.addFriend(sessionStorage.getItem('nmct.darem.accessToken'), e.target.attributes.tag.nodeValue).then(function(response){
           	divNewFriends.removeChild(divImg);
           	userModule.getUserData(sessionStorage.getItem("nmct.darem.accessToken")).then(function(response){
           		sessionStorage.setItem("nmct.darem.user", JSON.stringify(response));
           		let divFriends = document.getElementById("friends");
    			divFriends.innerHTML = '';
           		JSON.parse(sessionStorage.getItem("nmct.darem.user")).friends.forEach((friendItem) => {
    				let friend = new Friend(friendItem.name, friendItem.photo, friendItem.id);
    				friend.RenderAddedFriendHTML(divFriends);
    			});
       		});
       		});
        });
	}


}