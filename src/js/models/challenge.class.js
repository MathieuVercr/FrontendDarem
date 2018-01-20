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


  sendPost(){
    challengeModule.addChallenge(this).then((response) => console.log(response));
  }
}
