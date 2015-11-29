document.addEventListener("DOMContentLoaded", initTaskList);
function initTaskList() {
    //增加任务
    var addButton = document.getElementsByClassName("feet")[1];
    addButton.addEventListener("click", function () {
        var i;
        var taskLists = document.getElementsByClassName("taskLists")[0];
        if (taskLists != null) {
            i = taskLists.childNodes.length;
        } else {
            i = 0;
        }
        if (i < 15) {
            var taskName = prompt("输入任务文件名:", "");
            if (taskName != null && taskName != "") {
                var pattern = /.txt$/;
                if (!pattern.test(taskName)) {
                    taskName = taskName + '.txt';
                }
                var folders = document.getElementsByClassName("classifyLists");
                var openFile = document.getElementById("openFile");
                if (openFile != null) {
                    folderName = openFile.getAttribute('namedata');
                    var xhr = new XMLHttpRequest();
                    xhr.open('get', '/api/create-new-task?name=' + encodeURIComponent(taskName) + '&folderName=' + encodeURIComponent(folderName));
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            addTaskDocument(taskName, folderName);
                        }
                    };
                    xhr.send();
                } else if (openFile == null) {
                    alert("文件必须保存在某个文件夹中,单击打开文件夹。");
                }
            }
        } else {
            alert('已达到本文件夹文件数目上限!');
        }
    });
}

//在文件夹下增加任务
function addTaskDocument(taskName, parentNameData) {
    var i;
    var timeKeeper = timeKeep();
    var taskCreateTime = document.getElementsByClassName("taskCreateTime");
    var parentTaskLists = document.createElement("div");
    parentTaskLists.className = "parentTaskLists";
    parentTaskLists.setAttribute('namedata', taskName);
    parentTaskLists.setAttribute('parentNameData', parentNameData);
    parentTaskLists.onclick = openDocument;
    var newTask = document.createElement("span");
    newTask.className = "taskName";
    var removeTask = document.createElement("span");
    removeTask.className = "removeIcon";
    newTask.innerHTML = taskName;
    if (taskCreateTime != null) {
        for (i = 0; i < taskCreateTime.length; i++) {
            if (taskCreateTime[i].innerHTML == timeKeeper) {
                var parentList = taskCreateTime[i].parentElement;
                parentList.appendChild(parentTaskLists);
                parentTaskLists.appendChild(newTask);
                parentTaskLists.appendChild(removeTask);
                break;
            }
        }
    }
    if (taskCreateTime == null || !(i < taskCreateTime.length)) {
        var mainBody = document.getElementsByClassName("mainBody")[1];
        var div1 = document.createElement("div");
        div1.className = "taskLists";
        mainBody.appendChild(div1);
        var div2 = document.createElement("div");
        div2.className = "taskCreateTime";
        div2.innerHTML = timeKeeper;
        div1.appendChild(div2);
        div1.appendChild(parentTaskLists);
        parentTaskLists.appendChild(newTask);
        parentTaskLists.appendChild(removeTask);
    }


}

//得到当前的日期
function timeKeep() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var date = date.getDate();
    var timeKeeper = year + "-" + month + "-" + date;
    return timeKeeper;
}

//标记打开的文件
function openDocument() {
    var parentTaskLists = document.getElementsByClassName("parentTaskLists");
    for (var i = 0; i < parentTaskLists.length; i++) {
        parentTaskLists[i].id = "";
    }
    this.id = "openDocument";
    if (this.lastChild.className == "removeIcon") {
        this.lastChild.addEventListener("click", removeTask);
    }
    initDataInEditBox();
}

//删除文件
function removeTask() {
    var openDoc = document.getElementById("openDocument");
    var openDocNameData = openDoc.getAttribute('namedata');
    var openDocParentFolder = openDoc.getAttribute('parentNameData');
    if (openDoc != null) {
        var openDocParent = openDoc.parentNode;
        var forSure = confirm("你确定要删除该文件? 删除后文件中所有信息将丢失!", "");
        if (forSure != null && forSure != "") {
            var xhr = new XMLHttpRequest();
            xhr.open('get', '/api/remove-clicked-task?openDoc=' + encodeURIComponent(openDocNameData) + '&openFolder=' + encodeURIComponent(openDocParentFolder));
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    openDocParent.removeChild(openDoc);
                }
            }
            xhr.send();
        }
    }    
 
}