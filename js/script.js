
(function(){
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var boxCols=15;
	var boxRows=15;
	var tileSize=40;
	var playerCol=1;
	var playerRow=1;
	var leftKey=false;
	var rightKey=false;
	var upKey=false;
	var downKey=false;
	var moveSpeed=1;
	var playerXSpeed=0;//horizontal
	var playerYSpeed=0;//vertical
	
	var box = [ 
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	];
 
	var playerYPos=playerRow*tileSize;
    var playerXPos=playerCol*tileSize; 
    
    console.log("playerRow"+playerRow);
	
	canvas.width=tileSize*boxCols;
    canvas.height=tileSize*boxRows;
    console.log("canvas width"+canvas.width);
    console.log("canvas height"+canvas.height);
	
	document.addEventListener("keydown", function(e){
		// console.log(e.keyCode);
		switch(e.keyCode){
			case 37:
				leftKey=true;
				break;
			case 38:
				upKey=true;
				break;
			case 39:
				rightKey=true;
				break;
			case 40:
				downKey=true;
				break;
		}
	}, false);
 
	document.addEventListener("keyup", function(e){
		switch(e.keyCode){
			case 37:
				leftKey=false;
				break;
			case 38:
				upKey=false;
				break;
			case 39:
				rightKey=false;
				break;
			case 40:
				downKey=false;
				break;
		}
	}, false);
	
	// function to display the box
	
	function renderbox(){
		// clear the created tile
		context.clearRect(0, 0, canvas.width, canvas.height);

		//fix tile
		context.fillStyle = "red";
		for(i=0;i<boxRows;i++){
			for(j=0;j<boxCols;j++){
				if(box[i][j]==1){
					context.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);	
				}
			}
		}
		// player 
		context.fillStyle = "green";
		context.fillRect(playerXPos,playerYPos,tileSize,tileSize);
	}
	
	
	window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame||
		function(callback) {
			window.setTimeout(callback, 1000/60);
		};
	})();
	
	
	function updateGame() {
    
        playerXSpeed=0;
		playerYSpeed=0;
		
		if(rightKey){
			console.log("before"+playerXSpeed);
			playerXSpeed=moveSpeed;
			console.log("after"+playerXSpeed);
		}
		else{
			if(leftKey){
				playerXSpeed=-moveSpeed;
			}
			else{
				if(upKey){
					playerYSpeed=-moveSpeed;
				}
				else{
					if(downKey){
						playerYSpeed=moveSpeed;
					}         
				}          
			}         
		}
		
		// updating player position
		
		playerXPos+=playerXSpeed;
		playerYPos+=playerYSpeed;
		
		// check for horizontal collisions
		
		var baseCol = Math.floor(playerXPos/tileSize);
		var baseRow = Math.floor(playerYPos/tileSize);
		var colOverlap = playerXPos%tileSize;
		var rowOverlap = playerYPos%tileSize;
		
		if(playerXSpeed>0){
			if((box[baseRow][baseCol+1] && !box[baseRow][baseCol]) || (box[baseRow+1][baseCol+1] && !box[baseRow+1][baseCol] && rowOverlap)){
				playerXPos=baseCol*tileSize;
			}	
		}
		
		if(playerXSpeed<0){
			if((!box[baseRow][baseCol+1] && box[baseRow][baseCol]) || (!box[baseRow+1][baseCol+1] && box[baseRow+1][baseCol] && rowOverlap)){
				playerXPos=(baseCol+1)*tileSize;
			}	
		}
		
		// check for vertical collisions
		
		baseCol = Math.floor(playerXPos/tileSize);
		console.log(baseCol);
		baseRow = Math.floor(playerYPos/tileSize);
		console.log(baseRow);
		colOverlap = playerXPos%tileSize;
		rowOverlap = playerYPos%tileSize;
				
		if(playerYSpeed>0){
			if((box[baseRow+1][baseCol] && !box[baseRow][baseCol]) || (box[baseRow+1][baseCol+1] && !box[baseRow][baseCol+1] && colOverlap)){
				playerYPos = baseRow*tileSize;
			}	
		}
		
		if(playerYSpeed<0){
			if((!box[baseRow+1][baseCol] && box[baseRow][baseCol]) || (!box[baseRow+1][baseCol+1] && box[baseRow][baseCol+1] && colOverlap)){
				playerYPos = (baseRow+1)*tileSize;
			}		
		}
		
		// rendering box
		
		renderbox();
		
		// update the game in about 1/60 seconds
		
		requestAnimFrame(function() {
			updateGame();
		});
	}
 
	updateGame();
 
})();