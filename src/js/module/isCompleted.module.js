var isCompletedModule = (function(){

    function completeChallenge(response){
        for(let i = 0; i < response.acceptedUsers.length; i++){
            for(let j = 0; j < response.acceptedUsers[i].acceptedChallenges.length; j++){
              if(response.acceptedUsers[i].acceptedChallenges[j]._id == response._id){
                if(response.acceptedUsers[i].acceptedChallenges[j].isCompleted == true){
                  let imgUser = document.getElementById(response.acceptedUsers[i].facebook.id);
                  imgUser.setAttribute('class', 'challengeCompleted');
                }
              }
            }
          }
    }
    return{
        completeChallenge: completeChallenge
    }
})()
module.exports = isCompletedModule;