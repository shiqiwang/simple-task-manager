window.addEventListener("load", loadDataWhenRefresh);
document.addEventListener("click", initDataInEditBox);
//每次刷新都从后台读取数据,在classifyList栏中创建好已经存在的文件夹
function loadDataWhenRefresh() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/api/load-data-when-refresh');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //后台response的数据
                var folderlists = JSON.parse(xhr.responseText);
                //console.log(folderlists);
                //什么鬼...为什么说undefined 但是能console出数组
                for (var i = 0; i < folderlists.length; i++) {
                    newFolder(folderlists[i]);
                }
            }
        }//这里的else alert被我删了 晚上问问老是弹框的原因..fuck
    };
    xhr.send();
}

//当没有打开的文件时, editBox中所有数据清空
function initDataInEditBox() {
    var editBox = document.getElementById('editBox');
    var openDoc = document.getElementById('openDocument');
    if (openDoc == null || openDoc == '') {
        editBox.innerHTML = '';
    } else {
        var openDocNameData = openDoc.getAttribute('namedata');
        var openDocParentFolder = openDoc.getAttribute('parentNameData');
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/api/get-editbox-data-from-task?folder=' + encodeURIComponent(openDocParentFolder) + '&task=' + encodeURIComponent(openDocNameData));
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var eidtBoxData = JSON.parse(xhr.responseText);
                editBox.innerHTML = eidtBoxData;
            }
        }
        xhr.send();
    }
}

