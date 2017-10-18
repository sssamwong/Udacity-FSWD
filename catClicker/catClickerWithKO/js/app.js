var initialCats = [
    {
        clickCount: 0,
        name: "Tabby",
        imgSrc: "img/22252709_010df3379e_z.jpg",
        nicknames: ["Tablap", "Tab", "T", "TT", "Ta"]
    },
    {
        clickCount: 0,
        name: "Daddy",
        imgSrc: "img/434164568_fea0ad4013_z.jpg",
        nicknames: ["Dada"]
    }
]

var Cat = function(data){
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.nicknames = ko.observableArray(data.nicknames);

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

    var self = this;

    this.catList = ko.observableArray([]);

    initialCats.forEach(function(catItem){
        self.catList.push(new Cat(catItem));
    });

    this.currentCat = ko.observable(this.catList()[0]);

    this.updateCurrentCat = function(cat){
        self.currentCat(cat);
    }

    this.incrementCounter = function(){
        this.clickCount(this.clickCount() + 1);
    };

}

ko.applyBindings(new ViewModel())