export default class Challenge{
    constructor(id, creatorId, category, description, name, usersArray, users, acceptedUsers){
        super();

        this.id = id;
        this.creatorId = creatorId;
        this.category = category;
        this.description = description;
        this.name = name;
        this.usersArray = usersArray;
        this.users = users;
        this.acceptedUsers = acceptedUsers;
    }
}