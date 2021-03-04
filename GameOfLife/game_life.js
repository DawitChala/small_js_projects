// cell class. Only kill or revives, aswell as return state.
class celle {
    constructor(id) {
        this.status = false;
        this.id = id;
    }
    state() {
        return this.status;
    }
    kill() {
        this.status = false;
    }
    revive() {
        this.status = true;
    }
    getId() {
        return this.id;
    }
}
class board {
    constructor(x, y) {
            this.x = x;
            this.y = y;
            this.board_ = [];
            let id = 0;
            for (let i = 0; i < this.y; i++) {
                let row = []
                for (let j = 0; j < this.x; j++) {
                    let tall = Math.floor(Math.random() * 3);
                    let cell = new celle(id);
                    id++;
                    if (tall == 2) {
                        cell.revive();
                    }
                    row.push(cell);
                }
                this.board_.push(row);
            }
            let size = (x < y) ? y : x;
            if (40 * size > 450) {

            }
            this.makeBoard()
        }
        //makes the board in html
    makeBoard() {
        let id = 0;
        for (let i = 0; i < this.y; i++) {
            let brett = document.getElementById("board")
            for (let j = 1; j <= this.x; j++) {
                id++;
                brett.innerHTML += '<li class="rute" id="' + id + '"></li>';
                if (this.board_[i][j - 1].status == true) {
                    document.getElementById(id).style.background = "white";
                }
            }
            brett.innerHTML += '<br>';
        }


    }
    update() {
        let revive = [];
        let kill = [];
        for (let i = 0; i < this.y; i++) {
            for (let j = 0; j < this.x; j++) {
                //alive
                let liveNeighbors = this.findNeighbors(i, j);
                if (this.board_[i][j].status == true) {


                    if (!(liveNeighbors == 2 || liveNeighbors == 3)) {

                        kill.push(this.board_[i][j])

                    }

                }
                //dead
                else {
                    if (liveNeighbors == 3) {

                        revive.push(this.board_[i][j])
                    }

                }
            }
        }
        revive.forEach(element => {
            element.status = true;
            console.log("wassup")
            document.getElementById(element.id + 1).style.background = "white";
        });

        kill.forEach(element => {
            element.status = false;
            document.getElementById(element.id + 1).style.background = "black";


        })
        kill = []
        revive =   []


    }
    findNeighbors(y, x) {
        let counter = 0
        if (x != 0) {
            if (this.board_[y][x - 1].status == true) {
                counter++;
            }
        }
        if (y != 0) {
            if (this.board_[y - 1][x].status == true) {
                counter++;
            }
        }
        if (x != this.x - 1) {
            if (this.board_[y][x + 1].status == true) {
                counter++;
            }
        }
        if (y != this.y - 1) {
            if (this.board_[y + 1][x].status == true) {
                counter++;
            }
        }

        if (x != 0 && y != 0) {
            if (this.board_[y - 1][x - 1].status == true) {
                counter++;
            }
        }
        if (x != 0 && y != this.y - 1) {
            if (this.board_[y + 1][x - 1].status == true) {
                counter++;
            }
        }
        if (x != this.x - 1 && y != 0) {
            if (this.board_[y - 1][x + 1].status == true) {
                counter++;
            }
        }


        return counter;


    }

}


function update() {
    myBoard.update()

}

function reset() {
    console.log(document.getElementById("board").innerHTML)
    document.getElementById("board").innerHTML = "";
    myBoard = new board(10, 10)




}