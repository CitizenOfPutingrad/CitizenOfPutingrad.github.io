// Выставим нужный URL для теста с помощью History API
//history.replaceState({}, '', '/test?param=value&param2=42&keyonly');

// location.search === '?param=value&param2=42&keyonly'
let search = location.search.substr(1)
    .split('&') // разбиваем на параметры
    .reduce(function (res, a) { // разбираем пары ключ-значение
      let t = a.split('=');

      // нужно декодировать и ключ и значение, значения может не быть
      res[decodeURIComponent(t[0])] = t.length == 1 ? null : decodeURIComponent(t[1]);
      return res;
    }, {});

console.log(search); // {"param":"value","param2":"42","keyonly":null}

$('document').ready(function () {
  loadFanfic();
});

function loadFanfic() {
  $.getJSON('../json/loadfanfic.json', function (data) {
    console.log(data);
    out = '';
    const key = data[search["p"]];

    out += '<header class="container description-title">';
    out += '<div class="row justify-content-center">';
    out += '<img class="category-image my-auto" src="'+ key["information"]["category_image"] +'">';
    out += '<h3>' +  key["information"]["name"] +'</h3>';
    out += '</div>'
        + '</header>' ;

    out += '<div class="row">'
        + '<div class="col description-categories">';

    out += '<div class="row creators justify-content-md-center">';

    let i = 0;
    while ( typeof(key["information"]["authors"][i]) != "undefined")
    {
        out += '<img class="profile-image" src="'+ key["information"]["authors"][i][1] +'">';
        out += '<div class="col-auto">';
        out += '<a href="#" class="creators-person">' + key["information"]["authors"][i][2]+ '</a><br>';
        out += '<span class="creators-role">' + key["information"]["authors"][i][3] + '</span>' + '</div>';
        ++i;
    }
    out += '</div>';

    out += '<section class="row row-cols-2 justify-content-md-start">';

    out += '<header class="col-auto description-desctag">Фэндом:</header>' ;
    out += '<article class="col-auto"><a class="fanfic-tag" href="#'+ key["information"]["fandom"][0] +'"a>' +
        key["information"]["fandom"][1] + '</a></article>';
    out += '</section>';

    out += '<section class="row row-cols-2 justify-content-md-start">';
    out += '<header class="col-auto description-desctag"> Категория:</header>';
    out += '<article class="col-auto">\n <a  class="fanfic-tag" href="#">' + key["information"]["category"] + '</a></article>';
    out += '</section>';

    out += '<section class="row row-cols-2 justify-content-md-start">\n' +
        '<header class="col-auto description-desctag">\n' +
        'Рейтинг:\n' +
        '</header>\n' +
        '<article class="col-auto">\n' +
        '<span class="description-rating'+ key["information"]["rating"][1] +
        '">' +
        key["information"]["rating"][0] +
        '</span>'+
        '</article>\n' +
        '</section>';

    out += '<section class="row row-cols-2 justify-content-md-start">\n' +
        '<header class="col-auto description-desctag">\n' +
        'Статус:\n' +
        '</header>\n' +
        '<article class="col-auto">\n' +
        key["information"]["status"] +
        '</article>\n' +
        '</section>';

    out += '<section class="row row-cols-2 justify-content-md-start">\n' +
        '<header class="col-auto description-desctag">\n' +
        'Метки:\n' +
        '</header>\n' +
        '<article class="col-auto description-desctag">\n';
    i = 0;
    while (typeof (key["information"]["tags"][i]) != "undefined")
    {
        out +=  '<a class="fanfic-tag" href="#'
            + key["information"]["tags"][i][0] + '">'
            + key["information"]["tags"][i][1] + '</a> ';
        i++;
    }
    out += '</article>\n'+
        '</section>\n';

    out += '</div>';

    out += '<div class="col">';

    out += '<section class="container"> <header class="description-desctag">Описание:</header>\n' +
        '    <article class="container">\n'
        +key["information"]["description"]
        +'</article>'
        +'</section>';

    out +=
        '<section class="container">' +
        '   <header class="container description-desctag">Посвящение:</header>\n' +
        '    <article class="container">\n' +
        key["information"]["devotes"] +
        '        </article>' +
        '</section>' ;

    out += '<section class="container">' +
        ' <header class="container description-desctag">Публикация на других ресурсах:</header>\n' +
        '    <article class="container">\n' +
        key["information"]["publication"] +
        '        </article>' +
        '</section>';

    out += '<section class="container">' +
        '  <header class="container description-desctag">Примечание автора:</header>\n' +
        '    <article class="container">\n' +
        key["information"]["notes"] +
        '        </article>\n' +
    '</section>';

    out += '</div>';

    out += '</div>';

    out +=
      '<div class="container-flex description-notes">\n' +
      '<button><img src="../images/like.png"> '+ key["information"]["likes"] +' </button>' +
      '<button><img src="../images/share.png"</button>\n' +
      '<button><img src="../images/flag.png"</button>\n' +
      '</div>';




    $('#description').html(out);

    out = '';
    i = 0;
    while(typeof(key["chapters"][i+1]) != "undefined")
    {
        out +=
            '<div class="container chapter">\n' +
            '<a href="#'+ key["chapters"][i][0] +
            '">' +key["chapters"][i][1]+ '</a>\n' +
            '</div>';
        i++;
    }
     out += '<div class="container chapter chapter-end">\n' +
      '<a href="#'+ key["chapters"][i][0] +
      '">' +key["chapters"][i][1]+ '</a>\n' +
      '</div>';



    $('#chapters').html(out);

    out = '';
    for (let com in key["comments"])
    {
        out += '<section class="container">\n' +
            '\t<header>\n' +
            '\t\t<img class="profile-image" src="' + key["comments"][com]["image"] + '">\n'+
            '\t\t<div>\n\t\t\t<span><a href="#'+ com +'">' + key["comments"][com]["name"] + '</a></span><br>\n' +
            '\t\t\t<span>' + key["comments"][com]["date"] +'</span>\n' +
            '\t\t</div>'+
            '\t</header>\n'+
            '\t<article>\n' +
            key["comments"][com]["comment"] +
            '\t</article>\n'+
            '</section>\n';

    }
    $('#comments').html(out);
  });
}
