var isCompletedModule = (function(){

    function completeChallenge(response){
        for(let i = 0; i < response.acceptedUsers.length; i++){
            for(let j = 0; j < response.acceptedUsers[i].acceptedChallenges.length; j++){
              if(response.acceptedUsers[i].acceptedChallenges[j]._id == response._id){
                if(response.acceptedUsers[i].acceptedChallenges[j].isCompleted == true){
                  let imgUser = document.getElementById(response.acceptedUsers[i].facebook.id);
                  let user = JSON.parse(sessionStorage.getItem('nmct.darem.accessToken'));
                  imgUser.setAttribute('class', 'challengeCompleted');
                  if(response.acceptedUsers[i].facebook.id == user){
                    let completed = document.getElementById("btnCompleted");
                    completed.setAttribute("id", "btndisabled");
                    completed.disabled = true;
                  }
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