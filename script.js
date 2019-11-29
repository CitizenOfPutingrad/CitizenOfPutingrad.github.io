
//Тест
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
// конец теста

//крестики
var turn = 0;
var n1;
var n2;
var restart = false;
var pointsToWin = 2;
var arrField = [];
function CreateCxZfield(){	
	var x = document.getElementById("n2");
	if ( ( !x.checkValidity()) || ((x.value < 2) || (x.value > 25))) {
		alert("Введите длину от 2 до 25, используя цифры от 0 до 9");
		return;
	}
	x = document.getElementById("n1");
	if ( !x.checkValidity() || (x.value < 2)) {
		alert("Введите ширину от 2, используя цифры от 0 до 9");
		return;
	}
	removeField();
	document.getElementById("startButton").value = "начать заного";	
	n1 = document.getElementById("n1");
	n1 = n1.value;
	n2 = document.getElementById("n2");
	n2 = n2.value;	
	if ( (n1 > 4) && (n2 > 4) ) 
		pointsToWin = 5;
	else if ( (n1 > 3) && (n2 > 3) )
		pointsToWin = 4;
	else if ( (n1 > 2 ) && (n2 > 2) )
		pointsToWin = 3;
	var letka = document.getElementById("fieldCxZ");
	for( var i = 0; i < n1; ++i){
		var localArr = [];
		for (var j = 0; j < n2; ++j) {
			var button = document.createElement("input");
			button.setAttribute("type","button");
			button.setAttribute("i", i );
			button.setAttribute("j", j );
			button.setAttribute("onclick", "putxoro(this)");
			button.value = "";
			button.style.width = "1cm";
			button.style.height = "1cm";
			button.style.padding = "auto";
			button.style.fontSize = "5mm";
			letka.appendChild(button);
			localArr.push(button);			
		}
		arrField.push(localArr);
		letka.appendChild(document.createElement("br"));
	}
}



function putxoro(butt) {
	
	if (butt.value != "") return;
	
	if (turn == 0) {
		butt.style.color = "red";
		butt.value = "x";
		turn++;
	}
	else {
		butt.style.color = "blue";
		butt.value = "o";
		turn = 0;
	}
	var count = 0;
	for( i = 0; i < n1; i++){
		if (arrField[i][butt.getAttribute("j")].value == butt.value){
			count++;
			if(count == pointsToWin){
				winnerDetected();
				return;
			}
		}
		else
			count = 0;
	}
	count = 0;
	for ( j = 0; j < n2; j++ ) {
		if (arrField[butt.getAttribute("i")][j].value == butt.value) {
			count++;
			if ( count == pointsToWin) {
				winnerDetected();
				return;
			}
		}
		else
			count = 0;
	}
	
	count = 0;
	for ( var i = max(butt.getAttribute("i") - butt.getAttribute("j"), 0), j = max(butt.getAttribute("j") - butt.getAttribute("i"), 0); 
		(i < n1) && (j < n2); i++, j++ ) {		
		if (arrField[i][j].value == butt.value) {
			count++;
			if ( count == pointsToWin) {
				winnerDetected();
				return;
			}
		}
		else
			count = 0;
	}
	count = 0;
	for ( var i = max(parseInt(butt.getAttribute("i"),10) + parseInt(butt.getAttribute("j")) - parseInt(n1 - 1 ), 0), j = min(butt.getAttribute("j") + butt.getAttribute("i"), n2-1); 
	(i < n1) && (j > 0); i++, j-- ) {	
		if (arrField[i][j].value == butt.value) {
			count++;
			if ( count == pointsToWin) {
				winnerDetected();
				return;
			}
		}
		else
			;
	}
		
	
}

function winnerDetected(){
	alert("win");
	for( var i = 0; i < n1 ; i++)
		for (var j = 0; j < n2; j++)
		arrField[i][j].disabled = true;
	var x = document.createElement("p");
	x.id = "winnerMessage";
	if (turn == 0 )
		x.innerHTML = "Победили нолики!";
	else
		x.innerHTML = "Победили крестики!";
	var y = document.getElementById("fieldCxZ");
	y.insertAdjacentElement("beforeEnd",x)
}

function removeField(){
	var x = document.getElementById("fieldCxZ");
	if (x != null)
		document.getElementById("mainDiv").removeChild(x);
	x = document.getElementById("winnerMessage");
	if (x != null)
		document.getElementById("mainDiv").removeChild(x);
	x = document.createElement("div");
	x.id = "fieldCxZ";
	x.className = "DivBackground";
	document.getElementById("mainDiv").insertAdjacentElement("beforeEnd",x);
	turn = 0;	
	arrField = [];
}
function min(a,b){
	if (a < b) return a;
	else return b;
}

function max(a,b){
	if (a > b ) return a;
	else return b;
}
