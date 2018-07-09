const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const home = document.getElementById("home");
const bomberman = document.getElementById("bomberman");
const bombs = document.getElementById("bomb");
const fixtile = document.getElementById("fix-tile");
const breaktile = document.getElementById("break-tile");
const grass = document.getElementById("grass-tile");
const chest = document.getElementById("chest-tile");

let boxArr;

const boxCols = 15;
const boxRows = 15;
const tileSize = 40;

let playerCol = 1;
let playerRow = 1;

let playerYPos = playerRow * tileSize;
let playerXPos = playerCol * tileSize;

let bombYPos;
let bombXPos;

let i = 0;
let j = 0;

let leftKey = false;
let rightKey = false;
let upKey = false;
let downKey = false;
let moveSpeed = 2;
let playerXSpeed = 0; //horizontal
let playerYSpeed = 0; //vertical



class box {
    constructor() {
        boxArr = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1],
            [1, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 1],
            [1, 2, 0, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0, 2, 1],
            [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 1, 2, 1],
            [1, 2, 0, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0, 2, 1],
            [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
            [1, 2, 0, 2, 2, 2, 2, 3, 2, 2, 2, 0, 0, 2, 1],
            [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
            [1, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 1],
            [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
            [1, 2, 0, 2, 0, 2, 2, 2, 0, 2, 2, 0, 0, 2, 1],
            [1, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
            [1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        // canvas.width=tileSize*boxCols;
        // canvas.height=tileSize*boxRows;


    }

    init() {
        console.log("box init()");
        const tileObj = new tiles();
        tileObj.addTile();

    }

    // renderbox(){

    //     console.log("inside render"+canvas.height);


    // }
}

class tiles extends box {
    constructor() {
        super();
        console.log("tiles cons");
        canvas.width = tileSize * boxCols;
        canvas.height = tileSize * boxRows;

    }

    addTile() {
        // context.fillStyle = "silver";
        for (i = 0; i < boxRows; i++) {
            for (j = 0; j < boxCols; j++) {
                if (boxArr[i][j] == 1) {
                    console.log("forloop if");
                    context.drawImage(fixtile, j * tileSize, i * tileSize, tileSize, tileSize);
                } else if (boxArr[i][j] == 2) {
                    console.log("fixtile");
                    context.drawImage(breaktile, j * tileSize, i * tileSize, tileSize, tileSize);
                } else if (boxArr[i][j] == 3) {
                    console.log("fixtile");
                    context.drawImage(chest, j * tileSize, i * tileSize, tileSize, tileSize);
                }
                // else {
                //     context.drawImage(grasstile, j * tileSize, i * tileSize, tileSize, tileSize);

                // }
            }
        }

    }

}

class player extends box {
    constructor() {
        super();
        console.log("player cons");
    }

    createPlayer() {
        // player 

        console.log("inside createPlayer");
        // context.fillStyle = "green";
        // context.fillRect(playerXPos, playerYPos, tileSize - 4, tileSize - 4);
        context.drawImage(bomberman, playerXPos, playerYPos, tileSize - 6, tileSize - 6);
    }

    movePlayer() {
        console.log("inside movePlayer");
        document.addEventListener("keydown", function (e) {
            console.log(e.keyCode);
            switch (e.keyCode) {
                case 37:
                    leftKey = true;
                    playerXSpeed = -moveSpeed;
                    playerYSpeed = 0;
                    playerObj.updatePosition(playerXSpeed, playerYSpeed);
                    break;
                case 38:
                    upKey = true;
                    playerYSpeed = -moveSpeed;
                    playerXSpeed = 0;
                    playerObj.updatePosition(playerXSpeed, playerYSpeed);
                    break;
                case 39:
                    rightKey = true;
                    playerXSpeed = moveSpeed;
                    playerYSpeed = 0;
                    playerObj.updatePosition(playerXSpeed, playerYSpeed);

                    break;
                case 40:
                    downKey = true;
                    playerYSpeed = moveSpeed;
                    playerXSpeed = 0;
                    playerObj.updatePosition(playerXSpeed, playerYSpeed);
                    break;
            }
        }, false);
        // updating player position

    }

    updatePosition(playerXSpeed, playerYSpeed) {

        let collide = playerObj.checkCollision();
        // console.log("inside updatePos");
        context.clearRect(playerXPos, playerYPos, tileSize - 6, tileSize - 6);

        playerXPos += playerXSpeed;
        // console.log("playerx" + playerXPos);
        playerYPos += playerYSpeed;
        // console.log("playery" + playerYPos);
        playerObj.createPlayer();
    }


    checkCollision() {
        let baseCol = Math.floor(playerXPos / tileSize);
        let baseRow = Math.floor(playerYPos / tileSize);
        let colOverlap = playerXPos % tileSize;
        let rowOverlap = playerYPos % tileSize;

        if (playerXSpeed > 0) {
            if ((boxArr[baseRow][baseCol + 1] && !boxArr[baseRow][baseCol]) || (boxArr[baseRow + 1][baseCol + 1] && !boxArr[baseRow + 1][baseCol] && rowOverlap)) {
                playerXPos = baseCol * tileSize;
            }
        }

        if (playerXSpeed < 0) {
            if ((!boxArr[baseRow][baseCol + 1] && boxArr[baseRow][baseCol]) || (!boxArr[baseRow + 1][baseCol + 1] && boxArr[baseRow + 1][baseCol] && rowOverlap)) {
                playerXPos = (baseCol + 1) * tileSize;
            }
        }

        // check for vertical collisions

        baseCol = Math.floor(playerXPos / tileSize);
        console.log(baseCol);
        baseRow = Math.floor(playerYPos / tileSize);
        console.log(baseRow);
        // colOverlap = playerXPos%tileSize;
        // rowOverlap = playerYPos%tileSize;

        if (playerYSpeed > 0) {
            if ((boxArr[baseRow + 1][baseCol] && !boxArr[baseRow][baseCol]) || (boxArr[baseRow + 1][baseCol + 1] && !boxArr[baseRow][baseCol + 1] && colOverlap)) {
                playerYPos = baseRow * tileSize;
            }
        }

        if (playerYSpeed < 0) {
            if ((!boxArr[baseRow + 1][baseCol] && boxArr[baseRow][baseCol]) || (!boxArr[baseRow + 1][baseCol + 1] && boxArr[baseRow][baseCol + 1] && colOverlap)) {
                playerYPos = (baseRow + 1) * tileSize;
            }
        }

    }
}

class bomb extends box {
    constructor() {
        super();
    }

    plantBomb() {
        console.log("inside plantBomb");

        document.addEventListener("keydown", function (e) {

            bombXPos = playerXPos;
            bombYPos = playerYPos;

            console.log(e.keyCode);
            switch (e.keyCode) {
                case 32:
                    context.drawImage(bombs, bombXPos, bombYPos, tileSize - 6, tileSize - 6);
                    break;

            }
        }, false);
    }

    checkBombCollision() {

    }


}

// class game {
//     constructor() {

//     }
//     init() {
        
//     }
// }

this.home.onclick = () => {
	this.home.style.display = "none";
};

const boxObj = new box();
boxObj.init();

const playerObj = new player();
playerObj.createPlayer();
playerObj.movePlayer();

const bombObj = new bomb();
bombObj.plantBomb();
// window.requestAnimationFrame(function() {
//     window.setTimeout(playerObj.movePlayer(), 1000/60);
// });