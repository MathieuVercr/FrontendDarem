import challengeModule from '../module/challenge.module';

export default class challenge {
  constructor(name, description, category, creatorId, isCompleted, users, endDate) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.creatorId = creatorId;
    this.isCompleted = isCompleted;
    this.users = users;
    this.endDate = endDate;
  }


  sendPost(name, description, endDate, friends, category) {
    challengeModule.addChallenge(this).then((ok, nok) => {
      if (nok) console.log(nok);
      name.value = "";
      description.value = "";
      endDate.value = this.formatDate(new Date());
      friends.innerHTML = "";
      category.value = "";
    });
  }

  formatDate(date) {
    var d = new Date(date)
    var month = '' + (d.getMonth() + 1)
    var day = '' + d.getDate()
    var year = d.getFullYear()

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  RenderChallenges(){
    let bobTheHTMLBuilder = "";
        let divChallenge = document.createElement("div");
        divChallenge.setAttribute('tag', this.creatorId);
        bobTheHTMLBuilder += `<img src="./assets/images/${this.category.toLowerCase()}.png"></img>`;
        bobTheHTMLBuilder += `<div class="challenge__detail"><p>${this.name}</p>`;
        bobTheHTMLBuilder += `<p>${this.description}</p></div>`;
        divChallenge.innerHTML = bobTheHTMLBuilder;
        divChallenge.className = "challenge filler";

        divChallenge.addEventListener('click', function(e) {
          challengeModule.getChallengeData(e.target.attributes.tag.nodeValue).then(function(response) {
            articleContent.initDetails(response);
          });
        });

        return divChallenge;
  }
}
