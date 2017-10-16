var ViewModel = function(){
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

    this.incrementCounter = function(){
        this.clickCount(this.clickCount() + 1);
    };

    this.catLevel = ko.computed(function(){
        if (this.clickCount() < 10) {
            return "Newborn";
        } else if (this.clickCount() < 100){
            return "Infant";
        } else {
            return "Teen";
        }
    }, this);
}

ko.applyBindings(new ViewModel())