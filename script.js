document.addEventListener("DOMContentLoaded", function() {
	start();
	var blocks = document.getElementsByClassName("block");
	for (i=0;i<9;i++) {
    	blocks[i].onclick = function() {
        	click(this.id);
    	};
	};
	document.getElementById("game_reset").addEventListener("click", function(){
		start();
	});
	
});
function win(player){
	if(player==="X"||player==="O"){
		localStorage.gameover = player+" Heeft Gewonnen";
		alert(player+" heeft dit potje gewonnen");
	}else{
		localStorage.gameover = "Gelijk Spel";
		alert("Gelijk spel");
	}
	document.getElementById("game_player").innerHTML = localStorage.gameover;
}
function check(){
	var track = JSON.parse(localStorage.track);
	var pos = {
		1:['1', '2', '3'],2:['4', '5', '6'],3:['7', '8', '9'],
		4:['1', '4', '7'],5:['2', '5', '8'],6:['3', '6', '9'],
		7:['1', '5', '9'],8:['7', '5', '3'],
	}
	for(int=1;int<9;int++){
		if(track[pos[int][0]-1]==="X"&&track[pos[int][1]-1]==="X"&&track[pos[int][2]-1]==="X"){
			win("X");
		}else if(track[pos[int][0]-1]==="O"&&track[pos[int][1]-1]==="O"&&track[pos[int][2]-1]==="O"){
			win("O");
		}
	}
	if(localStorage.clicktime==="9"&&localStorage.gameover==""){
		win("gelijk");
	}
}
function start(){
	localStorage.turn = "X";
	localStorage.version = "1.0";
	localStorage.creator = "089 111 117 114 105 032 084 097 112 112 101 114";
	localStorage.track = JSON.stringify(["","","","","","","","",""]);
	for(int=1;int<10;int++){
		document.getElementById(int).innerHTML="";
	}
	document.getElementById("game_player").innerHTML = "X mag beginnen";
	localStorage.gameover = "";
	localStorage.clicktime = "";
	
}
function click(int){
	var track = JSON.parse(localStorage.track);
	if(track[int-1]==""&&localStorage.gameover==""){
		localStorage.clicktime = Number(localStorage.clicktime)+1;
		track[int-1] = localStorage.turn;
		localStorage.track = JSON.stringify(track);
		document.getElementById(int).innerHTML = localStorage.turn;
		if(localStorage.turn==="X"){
			localStorage.turn = "O";
		}else{
			localStorage.turn = "X";
		}
		document.getElementById("game_player").innerHTML = localStorage.turn+" is aan de beurt";
		check();
	}
}