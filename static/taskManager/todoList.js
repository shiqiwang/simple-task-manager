document.addEventListener("DOMContentLoaded", initTodoList);
function initTodoList() {
    //用户编辑todoList
    var editing = document.getElementById("edit");
    editing.addEventListener("click", edit);
    //保存
    var saving = document.getElementById("save");
    saving.addEventListener("click", save); 
}

//编辑
function edit() {
    var editBox = document.getElementById("editBox");
    editBox.contentEditable = "true";
    editBox.focus();
}
//保存
function save() {
    var openDoc = document.getElementById("openDocument");
    if (openDoc == null) {
        alert('数据必须保存在某个文件中!');
    }
    var openDocNameData = openDoc.getAttribute('namedata');
    var openDocParentFolder = openDoc.getAttribute('parentNameData');
    var editBox = document.getElementById("editBox");
    var data = editBox.innerHTML;
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/api/append-data-to-task?folder=' + encodeURIComponent(openDocParentFolder) + '&task=' + encodeURIComponent(openDocNameData) +'&data=' + encodeURIComponent(data));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
        }
    }
    xhr.send();
}
