board = [];
colors = { 0: "#cdc1b5", 2: "#eee4da", 4: "#eee1c9", 8: "#f3b27b", 16: "#f79665", 32: "#f77c5f", 64: "#f7603c", 128: "#edd073", 256: "#eecc63", 512: "#edc950", 1024: "#eec643", 2048: "#edc32d" }


function changeCol() {
    let zero = false;
    for (let i = 1; i < 17; i++) {
        document.getElementById(i.toString()).style.backgroundColor = colors[board[i]]
        if (board[i] == 0) {
            zero = true;
        }
    }
    if (zero == false) {
        chekIfLost();
    }
}

function chekIfLost() {

    let hoyreIndeks = [4, 8, 12, 16];
    for (let i = 1; i < board.length; i++) {
        if (i <= 12) {
            if (board[i] == board[i + 4]) {
                return;
            }
            if (!hoyreIndeks.includes(i)) {
                if (board[i] == board[i + 1]) {
                    return;
                }

            }
        }

    }
    document.getElementById("loosing_container").style.visibility = "visible";
}

function restart() {
    board = [];
    document.getElementById("loosing_container").style.visibility = "hidden";
    for (let i = 1; i < 17; i++) {
        document.getElementById(i.toString()).innerHTML = ""
    }

    fill()

}

function fill() {
    for (let i = 1; i <= 17; i++) {
        board.push(0)
    }
    board[0] = "kar"
    let tall = Math.floor(Math.random() * 15) + 1;
    let tall2 = Math.floor(Math.random() * 2);
    if (tall2 == 1) {
        document.getElementById(tall.toString()).innerHTML = "4"
        board[tall] = "4"
    } else {
        document.getElementById(tall.toString()).innerHTML = "2"
        board[tall] = "2"
    }
    let tall3 = Math.floor(Math.random() * 15) + 1;
    tall2 = Math.floor(Math.random() * 2);
    while (tall3 == tall) {
        tall3 = Math.floor(Math.random() * 15) + 1;
    }
    if (tall2 == 1) {
        document.getElementById(tall3.toString()).innerHTML = "4"
        board[tall3] = "4"
    } else {
        document.getElementById(tall3.toString()).innerHTML = "2"
        board[tall3] = "2"
    }
    changeCol()

}

function switch_places(j, last) {
    document.getElementById(last.toString()).innerHTML = board[j] * 2
    document.getElementById(j).innerHTML = "";
    console.log(board[last])
    board[last] = board[j] * 2
    board[j] = 0;

}

document.onkeydown = function checkKey(e) {
    var event = window.event ? window.event : e;

    let pressed = event.keyCode;
    switch (pressed) {
        case (38):

            moveup([1, 2, 3, 4], [13, 14, 15, 16], false);
            changeCol()

            break;
        case (39):
            moveright([4, 8, 12, 16], [0, 4, 8, 12], false);
            changeCol()

            break;
        case (40):
            moveDown([13, 14, 15, 16], [1, 2, 3, 4], false);
            changeCol()

            break;
        case (37):
            moveleft([1, 5, 9, 13], [5, 9, 13, 17], false);
            changeCol()

            break;
    }
}

function moveup(liste, liste2, not_add) {
    let change = false;

    for (let i = 0; i < 4; i++) {
        let list_w_empty_spaces = [];
        let list_w_NON_empty_spaces = [];
        let last = "";
        for (let j = liste[i]; j <= liste2[i]; j = j + 4) {
            if (board[j] == 0) {
                list_w_empty_spaces.push(j)

            } else {
                if (board[last] == board[j]) {
                    switch_places(j, last);
                    last = ""
                    change = true;
                    list_w_empty_spaces.push(j)
                } else {
                    list_w_NON_empty_spaces.push(j)
                    last = j;
                }
            }

        }
        while (list_w_NON_empty_spaces.length != 0 && list_w_empty_spaces.length != 0) {
            if (list_w_NON_empty_spaces[0] > list_w_empty_spaces[0]) {
                document.getElementById(list_w_empty_spaces[0].toString()).innerHTML = document.getElementById(list_w_NON_empty_spaces[0].toString()).innerHTML;
                board[list_w_empty_spaces[0]] = document.getElementById(list_w_NON_empty_spaces[0].toString()).innerHTML;
                document.getElementById(list_w_NON_empty_spaces[0]).innerHTML = "";
                let nyNullIndeks = list_w_NON_empty_spaces[0];
                board[list_w_NON_empty_spaces[0]] = 0;
                list_w_NON_empty_spaces.shift();
                list_w_empty_spaces.shift();
                list_w_empty_spaces.unshift(nyNullIndeks);
                list_w_empty_spaces.sort(function(a, b) { return a - b });
                change = true;
            } else {
                list_w_NON_empty_spaces.shift();
            }
        }
    }
    if (change == true) {

        addNew()
    }

}

function moveleft(liste, liste2, not_add) {
    let change = false;
    for (let i = 0; i < 4; i++) {
        let list_w_empty_spaces = []
        let list_w_NON_empty_spaces = []
        let last = "";
        for (let j = liste[i]; j < liste2[i]; j++) {
            if (board[j] == 0) {
                list_w_empty_spaces.push(j);
            } else {
                if (board[last] == board[j]) {
                    change = true;
                    switch_places(j, last);
                    last = ""
                    list_w_empty_spaces.push(j)
                } else {
                    last = j;
                    list_w_NON_empty_spaces.push(j)
                }
            }
        }
        while (list_w_NON_empty_spaces.length != 0 && list_w_empty_spaces.length != 0) {
            if (list_w_NON_empty_spaces[0] > list_w_empty_spaces[0]) {

                document.getElementById(list_w_empty_spaces[0].toString()).innerHTML = document.getElementById(list_w_NON_empty_spaces[0].toString()).innerHTML;
                board[list_w_empty_spaces[0]] = document.getElementById(list_w_NON_empty_spaces[0].toString()).innerHTML;
                document.getElementById(list_w_NON_empty_spaces[0]).innerHTML = "";
                let nyNullIndeks = list_w_NON_empty_spaces[0];
                board[list_w_NON_empty_spaces[0]] = 0;
                list_w_NON_empty_spaces.shift();
                list_w_empty_spaces.shift();
                list_w_empty_spaces.unshift(nyNullIndeks);
                list_w_empty_spaces.sort(function(a, b) { return a - b });
                change = true;


            } else {
                list_w_NON_empty_spaces.shift();
            }
        }
    }
    if (change == true) {

        addNew()

        console.log("changing color")
    }



}

function moveright(liste, liste2, not_add) {
    let change = false;
    for (let i = 0; i < 4; i++) {
        let list_w_NON_empty_spaces = [];
        let list_w_empty_spaces = [];
        let last = "";
        for (let j = liste[i]; j > liste2[i]; j--) {
            if (board[j] == 0) {
                list_w_empty_spaces.push(j);
            } else {

                if (board[last] == board[j]) {
                    switch_places(j, last);
                    change = true;
                    last = ""
                    list_w_empty_spaces.push(j)
                } else {
                    list_w_NON_empty_spaces.push(j)
                    last = j;
                }

            }
        }
        while (list_w_empty_spaces.length != 0 && list_w_NON_empty_spaces.length != 0) {
            if (list_w_NON_empty_spaces[0] < list_w_empty_spaces[0]) {
                document.getElementById(list_w_empty_spaces[0].toString()).innerHTML = document.getElementById(list_w_NON_empty_spaces[0].toString()).innerHTML;
                board[list_w_empty_spaces[0]] = document.getElementById(list_w_NON_empty_spaces[0].toString()).innerHTML;
                document.getElementById(list_w_NON_empty_spaces[0]).innerHTML = "";
                let nyNullIndeks = list_w_NON_empty_spaces[0];
                board[list_w_NON_empty_spaces[0]] = 0;
                list_w_NON_empty_spaces.shift();
                list_w_empty_spaces.shift();
                list_w_empty_spaces.unshift(nyNullIndeks);
                list_w_empty_spaces.sort(function(a, b) { return b - a });
                change = true;

            } else {
                list_w_NON_empty_spaces.shift()
            }
        }

    }
    if (change == true) {

        addNew()
    };

}
//[13, 14, 15, 16],[1, 2, 3, 4]
function moveDown(liste, liste2, not_add) {
    let change = false;
    for (let i = 0; i < 4; i++) {
        let list_w_empty_spaces = [];
        let list_w_NON_empty_spaces = [];
        let last = "";
        for (let j = liste[i]; j >= liste2[i]; j = j - 4) {

            if (board[j] == 0) {
                list_w_empty_spaces.push(j)

            } else {
                if (board[last] == board[j]) {
                    switch_places(j, last);
                    last = ""
                    list_w_empty_spaces.push(j)
                    change = true;

                } else {
                    last = j;
                    list_w_NON_empty_spaces.push(j)
                }
            }

        }
        while (list_w_NON_empty_spaces.length != 0 && list_w_empty_spaces.length != 0) {
            if (list_w_NON_empty_spaces[0] < list_w_empty_spaces[0]) {
                document.getElementById(list_w_empty_spaces[0].toString()).innerHTML = document.getElementById(list_w_NON_empty_spaces[0].toString()).innerHTML;
                board[list_w_empty_spaces[0]] = document.getElementById(list_w_NON_empty_spaces[0].toString()).innerHTML;
                document.getElementById(list_w_NON_empty_spaces[0]).innerHTML = "";
                let nyNullIndeks = list_w_NON_empty_spaces[0];
                board[list_w_NON_empty_spaces[0]] = 0;
                list_w_NON_empty_spaces.shift();
                list_w_empty_spaces.shift();
                list_w_empty_spaces.unshift(nyNullIndeks);
                list_w_empty_spaces.sort(function(a, b) { return b - a });
                change = true;

            } else {
                list_w_NON_empty_spaces.shift();
            }
        }


    }
    if (change == true) {
        addNew()
    }


}

function addNew() {
    let list_with_empyt_squares = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] == 0) {
            list_with_empyt_squares.push(i)
        }
    }


    let index = Math.floor(Math.random() * list_with_empyt_squares.length);

    board[list_with_empyt_squares[index]] = 2;
    document.getElementById(list_with_empyt_squares[index].toString()).innerHTML = 2;
}


fill();