let pressedButton = null;

function leggTil() {
    overskrift = document.getElementById("description").value;
    innhold = document.getElementById("Text1").value;
    console.log(document.getElementById("description"))

    if (overskrift.trim(" ") == "") {
        console.log("error");
        return;
    } else {

        let outPutConatiner = document.querySelector("#out");
        outPutConatiner.innerHTML += ('<div class="biggest"><div class="title">' +
            overskrift + '</div>' + '<button class="slett" onclick="del(this)" >X</button>' +
            '<img src="../svg_files/edit.svg" class="edit" onclick="edit(this)" onerror="this.onerror=null; this.src=\'image.png\'">' +
            '<div class="desc">' + innhold + '</div>');
    }
}

function del(selectedButton) {
    selectedButton.parentNode.parentNode.removeChild(selectedButton.parentNode)
}

function edit(editButton) {
    pressedButton = editButton;
    let modal = document.getElementById("myModal");
    modal.style.display = "block"
    parent = editButton.parentNode

    const innetHtmlTitle = title = parent.getElementsByClassName("desc")[0].innerHTML;
    const innerHtmlDesc = desc = parent.getElementsByClassName("title")[0].innerHTML;

    document.getElementById("change_desc").value = innetHtmlTitle
    document.getElementById("change_title").value = innerHtmlDesc
}

function escape() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none"
}

function change(accept) {
    parent = pressedButton.parentNode
    let title = document.getElementById("change_title").value
    let desc = document.getElementById("change_desc").value

    parent.getElementsByClassName("desc")[0].innerHTML = desc
    parent.getElementsByClassName("title")[0].innerHTML = title
    let modal = document.getElementById("myModal");
    modal.style.display = "none"


}