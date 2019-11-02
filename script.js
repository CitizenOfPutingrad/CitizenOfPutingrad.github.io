var RightAnswers
function init(){
	RightAnswers = [["a1","a2","a3"],["a1"],["a1"],["a","a","a","a"],["a","a"],["a"],["270000"],["a3"],["a1","a2","a3"],["a3"]];
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
	var text = "";
	var answers =  [];
	BlockPage(true);
	for( var i = 0; i < nforms; ++i )	{	
		var answer = [];	
		for( var j = 0; j < document.forms[i].length; ++j ) {
			switch (document.forms[i].elements[j].type){
				case "radio":
				case "checkbox":
					if ( document.forms[i].elements[j].checked) {
						answer.push( document.forms[i].elements[j].value);
					}
					break;
				case "text":
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
		}
		answers.push(answer);
	}
	var count = 0;
	for (var i = 0; i< RightAnswers.length; ++i){
		var flag = true;
		for( var j = 0; j < RightAnswers[i].length; ++j){
			if (RightAnswers[i][j] != answers[i][j]) {
				flag = false;
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
	+ "Повторить тест?\n" + "<button onclick=\"init()\">Заново</button>";
	
}
