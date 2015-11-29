//增加新对象, 如文件夹和文件
//objectType标识是要添加文件还是文件夹 
// 准备文件夹的type标记为0 文件的type标记为1
//newObjectType表示要创建的标签的type
//function addNewObject(parentName, objectType, newObjectType) {
//    var objectName = prompt("Enter the file name: ", "");
//    var parentNames = document.getElementsByClassName(parentName);
//    if (objectType == 0) {

//    }
//}


//计算指定对象的数量, 如文件夹和文件
function objectSum(objName) {
    var obj = document.getElementsByClassName(objName);
    return [obj, obj.length];
}
//标记打开的对象, 如打开的文件夹和文件
function openObject(objName) {
    var objLists = objectSum(objName);
    for (var i = 0; i < objLists[1]; i++) {
        objLists[0][i].id = "";
    }
    
}
//标记删除的对象, 如删除指定的文件夹和文件
function removeObject() { }