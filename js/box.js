(function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var boxCols = 15;

    var boxRows = 15;

    var tileSize = 40;

    var playerCol = 1;

    var playerRow = 1;

    var leftPressed = false;

    var rightPressed = false;

    var upPressed = false;

    var downPressed = false;

    var movementSpeed = 3;

    var playerXSpeed = 0; //horizontal speed

    var playerYSpeed = 0;



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

    var playerYPos = playerRow * tileSize;
    var playerXPos = playerCol *= tileSize;

    canvas.width = tileSize * boxCols;
    canvas.height = tileSize * boxRows;

    document.addEventListener("keydown", function (e) {

        console.log(e.keyCode);

        switch (e.keyCode) {

            case 37:

                leftPressed = true;

                break;

            case 38:

                upPressed = true;

                break;

            case 39:

                rightPressed = true;

                break;

            case 40:

                downPressed = true;

                break;

        }

    }, false);



    document.addEventListener("keyup", function (e) {

        switch (e.keyCode) {

            case 37:

                leftPressed = false;

                break;

            case 38:

                upPressed = false;

                break;

            case 39:

                rightPressed = false;

                break;

            case 40:

                downPressed = false;

                break;

        }

    }, false);

    function renderbox() {

        // clear the canvas

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "red";

        for (i = 0; i < boxRows; i++) {

            for (j = 0; j < boxCols; j++) {

                if (box[i][j] == 1) {

                    context.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);

                }

            }

        }

        // player = green box

        context.fillStyle = "green";

        context.fillRect(playerXPos, playerYPos, tileSize, tileSize);

    }

    window.requestAnimFrame = (function (callback) {

        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||

            function (callback) {

                window.setTimeout(callback, 1000 / 60);

            };

    })();



    // function to handle the game itself



    function updateGame() {
        playerXSpeed = 0;

        playerYSpeed = 0;

        if (rightPressed) {

            playerXSpeed = movementSpeed;

        } else {

            if (leftPressed) {

                playerXSpeed = -movementSpeed;

            } else {

                if (upPressed) {

                    playerYSpeed = -movementSpeed;

                } else {

                    if (downPressed) {

                        playerYSpeed = movementSpeed;

                    }

                }

            }

        }



        // updating player position

        playerXPos += playerXSpeed;

        playerYPos += playerYSpeed;



        // rendering box



        renderbox();



        // update the game in about 1/60 seconds



        requestAnimFrame(function () {

            updateGame();

        });

    }



    updateGame();



})();