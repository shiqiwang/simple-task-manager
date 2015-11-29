document.addEventListener("DOMContentLoaded", initClassifyList);

function initClassifyList() {
    //添加新文件夹
    var addFolder = document.getElementsByClassName("feet")[0];
    addFolder.addEventListener("click", function () {
        var i = removeFolder();
        if (i < 10) {
            var fileName = prompt("请输入添加的文件名: ", "");
            if (fileName != null && fileName != '') {
                createNewFolder(fileName);
                i++;
            }
        } else {
            alert("已达到文件夹数目上限!");
        }
    });
}

//返回文件夹数量
function folderSum() {
    var classifyLists = document.getElementsByClassName("classifyLists");
    return [classifyLists, classifyLists.length];
}

//创建文件夹的同时,taskManagrData中文件夹的创建
function createNewFolder(fileName) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/api/create-new-folder?name='+encodeURIComponent(fileName));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                newFolder(fileName);
                var message = JSON.parse(xhr.responseText);
            }
        }//这儿的else也被删了
    };
    xhr.send();
}

//在第一栏中添加新的文件夹
function newFolder(fileName) {
    var mainBody = document.getElementsByClassName("mainBody")[0];
    var classifyLists = document.createElement("div");
    classifyLists.className = "classifyLists";
    classifyLists.setAttribute("nameData", fileName);
    //添加openFile方法
    classifyLists.onclick = openFile;
    mainBody.appendChild(classifyLists);
    var spanArray = ["folderIcon", "folderName", "removeIcon"];
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 3; i++) {
        var span = document.createElement("span");
        span.className = spanArray[i];
        if (i == 1) {
            if (fileName != null && fileName != "") {
                span.innerHTML = fileName + "(<span>0</span>)";
            }
        }
        frag.appendChild(document.createTextNode(" "));
        frag.appendChild(span);
    }      
    classifyLists.appendChild(frag);
}

//标记打开的文件夹
function openFile() {
    var folderLists = folderSum();
    for (var i = 0; i < folderLists[1]; i++) {
        folderLists[0][i].id = "";
        var taskLists = document.getElementsByClassName("taskLists")[0];
        var parentTaskLists = document.getElementsByClassName("parentTaskLists");

        // Node list
        for (var j= 0; j < parentTaskLists.length; j++) {
            taskLists.removeChild(parentTaskLists[j]);
        }
    }
    this.id = "openFile";
    if (this.lastChild.className == "removeIcon") {
        this.lastChild.onclick = removeFolder;
    }
    listTaskListUnderTheOpenedFile();
}

function listTaskListUnderTheOpenedFile() {
    var openFile = document.getElementById("openFile");
    var openFileNameData = openFile.getAttribute('namedata');
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/api/load-task-data-when-fileOpened?openedFolder=' + encodeURIComponent(openFileNameData));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var tasklists = JSON.parse(xhr.responseText);
            for (var i = 0; i < tasklists.length; i++) {
                addTaskDocument(tasklists[i], openFileNameData);
            }
        }
    }
    xhr.send();
}

//删除文件夹
function removeFolder() {
    var foldersum = folderSum();
    var sum = foldersum[1];
    if (this !== window) {
        if (this.parentNode.className == "classifyLists") {
            var removedFolder = this.parentNode;
            var mainBody = document.getElementsByClassName("mainBody")[0];
            var forSure = confirm("确定要删除文件夹? 该文件夹中所有记录将被清空!");
            if (forSure != null && forSure != "") {
                var xhr = new XMLHttpRequest();
                xhr.open('get', '/api/remove-folder?name=' + encodeURIComponent(this.parentNode.getAttribute('nameData')));
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            mainBody.removeChild(removedFolder);
                        }
                    }
                };
                xhr.send();
                sum--;
            }
        }
    }  
    return sum;
}


//为第一栏中“所有任务”后的数字填充做准备,显示所有的任务文件数目
function DisplayAllTaskNum() {
    var allTaskNum = document.getElementById("allTaskNum");
    var taskName = document.getElementsByClassName("taskName");
    var taskNum = taskName.length;
    allTaskNum.innerHTML = taskNum;
}
