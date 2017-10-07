var catPictures = [["Apple", "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426"], ["Banana", "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496"], ["Grape", "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454"], ["Orange", "https://imgflip.com/s/meme/Cute-Cat.jpg"], ["Melon", "https://i.pinimg.com/736x/1b/bd/5f/1bbd5fb17d8e86706993f56ef5e4cd05--cute-photos-cute-cats.jpg"]];

var clickCounts = [0,0,0,0,0];

function catClicker() {
    $("p").replaceWith("<p></p>");

    var selectedCat = $("#catList").val();

    for (i=0;i<5;i++){
        if (selectedCat===catPictures[i][0]) {
            $("img").replaceWith("<img src='" + catPictures[i][1] + "'>'");
            var currentCatIndex = i;
            console.log(currentCatIndex);
        }
    }

    $("img").click(function(){
        clickCounts[currentCatIndex] = clickCounts[currentCatIndex] + 1;
        console.log(clickCounts[currentCatIndex]);
        $("p").replaceWith("<p>" + clickCounts[currentCatIndex] + " click(s)</p>");
    })
}

$("select#catList").change(catClicker);
//catClicker();