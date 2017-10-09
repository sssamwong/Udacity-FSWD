$(function(){

    var model = {

        currentCat: null,

        catPictures : [
            {   clickCount : 0,
                name : "Apple", 
                imgSrc : "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426"
            },
            {   clickCount : 0,
                name : "Banana",
                imgSrc : "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496"
            },
            {   clickCount : 0,
                name : "Grape",
                imgSrc : "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454"
            },
            {   clickCount : 0,
                name : "Orange",
                imgSrc : "https://imgflip.com/s/meme/Cute-Cat.jpg"
            },
            {   clickCount : 0,
                name : "Melon",
                imgSrc : "https://i.pinimg.com/736x/1b/bd/5f/1bbd5fb17d8e86706993f56ef5e4cd05--cute-photos-cute-cats.jpg"
            }]

    };

    var octopus = {

        returnCatList: function(){
            return model.catPictures;
        },

        setCurrentCat: function(currentCatIndex){
            model.currentCat = currentCatIndex;
//            console.log("in setCurrentCat now " + model.currentCat);
        },

        returnClickCount: function(){
//            console.log("in returnClickCount now " + model.currentCat);
            return model.catPictures[model.currentCat].clickCount;
        },

        incrementClickCount: function(){
//            console.log("in incrementClickCount now");
            model.catPictures[model.currentCat].clickCount ++;
//            console.log("in incrementClickCount now " + model.catPictures[model.currentCat].clickCount + " click(s)");
        },

        init: function(){
            view.init();
        }
    };

    var view = {
        init: function(){
//            console.log("in view init");
            var catList = $("ul#catList");
            view.showCatList();
            $("li").click(function(){
                $("p").text("");
                var selectedCat = $(this).text();
//                console.log(selectedCat);
                view.showCatPicture(selectedCat);
            });
        },
        showCatList: function(){
//            console.log("in change");
            var cats = octopus.returnCatList();
            $.each(cats, function(i, cat){
                $("ul#catList").append("<li>" + cat.name + "</li>");
            });
        },
        showCatPicture: function(selectedCat){
            var cats = octopus.returnCatList();
            for (i=0;i<5;i++){
                if (selectedCat===cats[i].name) {
                    $("h2").text(cats[i].name);
                    $("img").replaceWith("<img src='" + cats[i].imgSrc + "'>'");
                    octopus.setCurrentCat(i);
                };
            };
            $("img").click(function(){
//                console.log("in img click now");
                octopus.incrementClickCount();
                view.clickCounter();
            });
        },
        clickCounter: function(){
//            console.log("in click counter now");
            var showClickCount = octopus.returnClickCount();
//            console.log("in clickCounter now " + showClickCount + " click(s)");
            $("p").text(showClickCount + " click(s)");
        }
    };

    octopus.init();

});
