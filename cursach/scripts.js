$('document').ready(function () {
    loadRandFanfic();
});

function loadRandFanfic() {
    $.getJSON('json/randfanfic.json', function (data) {
        let out = '';
        for (const key in data) {
            out += '<section class="container fanfic-' + data[key]["category"] +'">' + '<header>'
                + '<a href="readpage/?p=' + key + '">';
            out += '<img class="category-image" src="' + data[key]["category_image"] + '"></img>';
            out += '<h3>' + data[key]["name"] + '</h3>' + '</a>';
            out += '<a href="#'+ data[key]["author"][0] +'"><img class="profile-icon" src="' + data[key]["author"][2] + '"></img>';
            out += '<h4>' + data[key]["author"][1] + '</h4></a>';
            out += '<section class="description-desctag">Фэндом: <a class="fanfic-tag" href="#' + data[key]["fandom"][0] + '">' + data[key]["fandom"][1] + '</a></section>';
            out += '<section class="description-desctag">Рейтинг: <span class="description-rating'+data[key]["rating"][1] +'">' + data[key]["rating"][0] + '</span></section>';
            out += '<section class="description-desctag">Статус: <a>' + data[key]["status"] + '</a></section>';
            out += '<section class="description-desctag">Метки: '
            for (let i in data[key].tags) {
                out += '<a class="description-desctag" href="#' + data[key].tags[i][0] + '">' + data[key].tags[i][1] + '</a> ';
            }

            out += '</section>' + '</header>' + '<article>';
            out += data[key]["description"];
            out += '</article>' + '</section>';
        }
        $('#random_fanfic').html(out);
    });
}
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200){
        myFunction(this.responseText);
    }
}