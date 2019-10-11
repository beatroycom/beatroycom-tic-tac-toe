let game = {}

const pos = {
	1:['1', '2', '3'],2:['4', '5', '6'],3:['7', '8', '9'],
	4:['1', '4', '7'],5:['2', '5', '8'],6:['3', '6', '9'],
	7:['1', '5', '9'],8:['7', '5', '3'],
}

document.addEventListener("DOMContentLoaded",() => {
	start();
	let blocks = document.getElementsByClassName("block");
	for (i=0;i<9;i++) {
    	blocks[i].onclick = function () {
        	click(this.id);
    	};
	};
	document.getElementById("game_reset").addEventListener("click", ()=>start());
});

const win = (player)=>{
	player = player.toLowerCase();
	message = ''
	switch (player){
		case 'x':
			message = 'x has won';
			break;
		case 'o':
			message = 'o has won';
			break;
		default:
			message = 'tie'
	}
	game.gameover = true;
	alert(message)
	document.getElementById("game_player").innerHTML = message;
}

const check = ()=>{
	let track = game.track;
	
	for(int=1;int<9;int++){
		if(track[pos[int][0]-1]==="X"&&track[pos[int][1]-1]==="X"&&track[pos[int][2]-1]==="X"){
			win("X");
		}else if(track[pos[int][0]-1]==="O"&&track[pos[int][1]-1]==="O"&&track[pos[int][2]-1]==="O"){
			win("O");
		}
	}
	if(game.clicktime==="9"&&game.gameover===false){
		win("gelijk");
	}
}
function start(){
	game.turn = "X";
	game.version = "1.0";
	game.track = ["","","","","","","","",""];
	for(int=1;int<10;int++){
		document.getElementById(int).innerHTML="";
	}
	document.getElementById("game_player").innerHTML = "X mag beginnen";
	game.gameover = false;
	game.clicktime = "";
	
}
function click(int){
	let track = game.track;
	if(track[int-1]==""&&game.gameover===false){
		game.clicktime = Number(game.clicktime)+1;
		track[int-1] = game.turn;
		game.track = track;
		document.getElementById(int).innerHTML = game.turn;
		if(game.turn==="X"){
			game.turn = "O";
		}else{
			game.turn = "X";
		}
		document.getElementById("game_player").innerHTML = game.turn+" is aan de beurt";
		check();
	}
}