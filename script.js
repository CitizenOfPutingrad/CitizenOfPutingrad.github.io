var RightAnswers = [];

function CreateCard(name, count, length) {
	var text = [];
	for (var i = 0; i < count; ++i) text.push("a");
	var x = CreateQuestion(name,"text",[],text);
	for (var i = 0; i < count; ++i) {
		var y = document.createElement("input");
		y.type = "text";
		y.name = "answer";
		y.maxLength ="4";
		y.pattern = "[0-9]{" + length +"}";
		y.className = "card";
		x.insertAdjacentElement("beforeend",y)
	}
}
function CreateAnswer ( x, type, ans){
	for (var i = 0; i < ans.length; ++i) {
		var y = document.createElement("input");
		y.type = type;
		y.name = "answer";
		if (type != "text") y.value = i + ""; 
		x.insertAdjacentElement("beforeend",y);
		text = document.createElement("span");
		text.innerHTML = ans[i] + "<br>";
		y.insertAdjacentElement("afterend",text);
	}
}

function CreateQuestion(name, type, ans, rans){
	var x = document.getElementById("test");
	var y;
	var text;	
	RightAnswers.push(rans);
	for ( var i = 0; i < 4; ++i){
		switch (i) {
			case 0: 
				text = "li";				
				break;
			case 1: 
				text = "b";
				break;
			case 2:
				text = "form";
				break;
			case 3:
				text = "p";
				break;
		}
		y = document.createElement(text);
		x.insertAdjacentElement("beforeend",y);
		if( i != 1 ) x = y;
		else y.innerHTML = name;
	}
	CreateAnswer(x, type, ans);
	return x;
}

function restart(){
	BlockPage(false);
	var x = document.getElementsByTagName("input");
	for ( var i = 0; i < x.length; ++i ){
		x[i].checked = false;
		if(x[i].type == "text") x[i].value = "";
	}
	x = document.forms
	for (var i = 0; i < x.length; ++i){
		x[i].style.background = "";
	}
	x = document.getElementById("result");
	x.innerHTML = "";
}

function cardcheck(i,j,n) {
	if( document.forms[i].elements[j].value.length == n) RightAnswers[i][j] = document.forms[i].elements[j].value;
}

function BlockPage (bool) {
	var x = document.getElementsByTagName("input");
	for (var i = 0; i < x.length; ++i){
		x[i].disabled = bool;
	}
}

function check(){
	var nforms = document.forms.length;
	var answers =  [];
	BlockPage(true);
	for( var i = 0; i < nforms; ++i )	{	
		var answer = [];	
		for( var j = 0; j < document.forms[i].length; ++j ) {
			if (document.forms[i].elements[j].type == "text"){
				switch (i)
				{
					case 3: 
						cardcheck(i,j,4);
						break;
					case 4:
						cardcheck(i,j,2);
						break;
					case 5:
						cardcheck(i,j,3);
						
				}
				answer.push(document.forms[i].elements[j].value);
			}
			else if ( document.forms[i].elements[j].checked) {
						answer.push( document.forms[i].elements[j].value);
			}				
		}
		answers.push(answer);
	}
	var count = 0;
	for (var i = 0; i < RightAnswers.length; ++i){
		var flag = true;
		for( var j = 0; j < RightAnswers[i].length; ++j){
			if (RightAnswers[i][j] != answers[i][j]) {
				flag = false;
				break;
			}
		}
		if (flag) {
			document.forms[i].style.background = "green";
			++count;
		}
		else {
			document.forms[i].style.background = "red";
		}
	}
	var x = document.getElementById("result");
	x.innerHTML = "Ваш результат: " + count + " правильных ответов! <br>"
	+ "Повторить тест?\n" + "<button onclick=\"restart()\">Заново</button>";
}

function init(){
	CreateQuestion("Кто стал президентов РФ в 20!8 году?", "checkbox", ["Путин", "Путин", "Не Навальный"], ["0","1","2"]);
	CreateQuestion("Продолжите фразу: «Русские - …»?","radio", ["вперед!", "стоят!", "назад!"], ["0"]);
	CreateQuestion("Продолжите фразу: «Макароны...»","radio", ["с макарошками", "с пюрешкой", "с хлебом"], ["0"]);
	CreateCard("Номер вашей банковской карточки?", 4, 4);
	CreateCard("Срок действия карточки?", 2, 2);
	CreateCard("Номер с обратной стороны?", 1,3);
	CreateQuestion("Период полураспада урана?","text",[""],["270000"]);
	CreateQuestion("Продолжите фразу: I never asked... ", "radio", ["For Honor","for number 9 with extra dip","for this"], ["2"]);
	CreateQuestion("Поставьте галочки", "checkbox",["тут", "тут", "и здесь тоже"],["0","1","2"]);
	CreateQuestion("Узнали?","checkbox",["Перевернули?","Наказали?", "Согласны?"],["2"]);
}

var turn = 0;
function CreateCxZfield(){
	var n1 = document.getElementById("n1");
	n1 = n1.value;
	var n2 = document.getElementById("n2");
	n2 = n2.value;
	
	var x = [];
	var y =[];
	var d1 = [];
	var d2 = [];
	var letka = document.getElementById("fieldCxZ");
	for( var i = 0; i < n1; ++i){
		var arr = [];
		for (var j = 0; j < n2; ++j) {
			var button = document.createElement("input");
			button.id = i+j+"";
			button.type = "button";
			button.setAttribute("onclick", "putxoro(this)");
			button.value = " ";
			letka.appendChild(button);
		}
		letka.appendChild(document.createElement("br"));
	}
}

function putxoro(butt) {
	if (butt.value != " ") return;
	if (turn % 2 == 0) {
		butt.value = "x";
	}
	else {
		butt.value = "o";
	}
	turn += 1;
}
