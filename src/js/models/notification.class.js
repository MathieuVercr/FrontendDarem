export default class notification{
    constructor(name, text){
        this.name = name;
        this.text = text;
    }

    RenderNotification(){
        let notifSection = document.createElement("section");
        notifSection.setAttribute('id', 'notification');
        var body = document.getElementById("ALL");
        body.appendChild(notifSection);
        let bobTheHTMLBuilder = "";
        bobTheHTMLBuilder += "<div>";
        bobTheHTMLBuilder += this.name + " " + this.text;
        bobTheHTMLBuilder += "</div>";
       
        notifSection.innerHTML = bobTheHTMLBuilder;
        notifSection.setAttribute('id', 'showNotification');
        
        setTimeout(function(){ notifSection.remove(); }, 5000);
        
    }

}