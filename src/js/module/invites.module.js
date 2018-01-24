var invitesModule = (function(){
    
    function updateInvites(mark, challenges){
        if(challenges.length > 0){
            mark.setAttribute('class', 'showMark');
            mark.innerHTML = challenges.length;
          }else{
            mark.setAttribute('class', 'noMark');
          }
    }
    return{
        updateInvites: updateInvites
    }
})()
module.exports = invitesModule;