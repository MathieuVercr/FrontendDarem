import Friend from '../models/friend.class';
import userModule from './user.module';

export function UpdateFriendUI(e, divNewFriends, divImg) {
  userModule.addFriend(sessionStorage.getItem('nmct.darem.accessToken'), e.target.attributes.tag.nodeValue).then(function(response) {
    divNewFriends.removeChild(divImg);
    userModule.getUserData(sessionStorage.getItem("nmct.darem.accessToken")).then(function(response) {
      //sessionStorage.setItem("nmct.darem.user", JSON.stringify(response));
      //let divFriends = document.getElementById("friends");
      //divFriends.innerHTML = '';
      //JSON.parse(sessionStorage.getItem("nmct.darem.user")).friends.forEach((friendItem) => {
        //let friend = new Friend(friendItem.name, friendItem.photo, friendItem.id);
        //friend.RenderAddedFriendHTML(divFriends);
      //});
    });
  });
}
