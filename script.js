"use strict"
let list = []; 
loadlist();
showlist();
document.getElementById('sub').onclick = function(){
    let firstName = document.querySelector('#Firstname').value;
    let lastName = document.querySelector('#Lastname').value;
    let surName = document.querySelector('#Surname').value;
    let year = document.querySelector('#Year').value;
    let Class = document.querySelector('#Class').value;
    if(firstName != '' && lastName != '' && surName != '' && year != '' && Class != '' ){
        if(1950<= year <=2050 && Class <=11){
    let stroke = {
        fName : firstName,
        lName : lastName,
        sName : surName,
        Year : Number.parseInt(year),
        class : Number.parseInt(Class)
    }

    list.push(stroke);
    savelist();
    showlist();
    }
}else{
    alert('Поля не заполнены!')
}
}

function savelist(){
    localStorage.setItem('list', JSON.stringify(list));
}

function loadlist(){
    if (localStorage.getItem('list')) list = JSON.parse(localStorage.getItem('list'));
    showlist();
}

function showlist(){
    let commentField = document.getElementById('table');
    let out = '';
    let count = 0;
for(let i in list){
    count++ 
        out += `
        <tr>
            <th scope="row">${count}</th>
            <td>${list[i].fName}</td>
            <td>${list[i].lName}</td>
            <td>${list[i].sName}</td>
            <td>${list[i].Year}</td>
            <td>${list[i].class}</td>
            <th scope="row"><a href="#" data-art="${[i]}" class="remove"><i class="fas fa-trash-alt"></i></a></th>
        </tr>
        `;
}
    commentField.innerHTML = out;
    $('.remove').on('click', deleteComment);
}
   

function deleteComment(){
    let id = $(this).attr('data-art');
    list.splice(id,1);
    savelist()
    showlist()
}

document.getElementById('sortN').onclick = function(){
    loadlist()
    if($('#sortN').val()=='1'){
        list.sort(function(a, b){
            var x = a.fName.toLowerCase();
            var y = b.fName.toLowerCase();
            if (x > y) {return -1;}
            if (x < y) {return 1;}
            return 0;
        });
        document.getElementById("sortN").value="2";
    }else{
    list.sort(function(a, b){
        var x = a.fName.toLowerCase();
        var y = b.fName.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });
    document.getElementById("sortN").value="1";
    }
    showlist()
}

document.getElementById('sortY').onclick = function(){
    loadlist()
    if($('#sortY').val()=='1'){
        list.sort(function(a, b){return b.Year - a.Year});
        document.getElementById("sortY").value="2";
    }else{
        list.sort(function(a, b){return a.Year - b.Year});
        document.getElementById("sortY").value="1";
    }
    showlist()
}

document.getElementById("download").onclick = function writeFile(name, value) {
    var val = value;
    if (value === undefined) {
    val = "";
    }

    download.href = "data:text/plain;content-disposition=attachment;filename=file," + val;
    download.download = name;

    
    writeFile("Data.txt", JSON.stringify(list));
}
