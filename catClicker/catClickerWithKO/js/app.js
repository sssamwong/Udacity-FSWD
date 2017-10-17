var Cat = function(){
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('img/22252709_010df3379e_z.jpg');
    this.nicknames = ko.observableArray([
        {nickname: "Tab"},
        {nickname: "Tablap"},
        {nickname: "T"},
        {nickname: "TT"},
        {nickname: "Ta"}
        ]);

    this.catLevel = ko.computed(function(){
        if (this.clickCount() < 10) {
            title = "Newborn";
        } else if (this.clickCount() < 100){
            title = "Infant";
        } else {
            title = "Teen";
        }
        return title;
    }, this);

}

var ViewModel = function(){

    this.currentCat = ko.observable(new Cat());

    this.incrementCounter = function(){
        this.clickCount(this.clickCount() + 1);
    };

}

ko.applyBindings(new ViewModel())