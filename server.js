var FS = require("fs-extra");
var express = require("express");

// ensure data directory.
FS.ensureDirSyn('taskManagerData');

function createFolder(folderName) {
    var folderPath = 'taskManagerData/' + folderName;
    FS.mkdirSync(folderPath);
}

function createTask(folerName, taskName) {
    var taskPath = 'taskManagerData/' + folerName + '/' + taskName;
    FS.writeFileSync(taskPath);
}

//读取文件夹列表
function listFolder() {
    return FS.readdirSync('taskManagerData');
}

//读取文件夹中文件列表
function listTask(folderName) {
    return FS.readdirSync('taskManagerData/' + folderName);
}

//读取文件中的数据 要指定编码方式
function listTaskData(folderName, taskName) {
    return FS.readFileSync('taskManagerData/' + folderName + '/' + taskName, 'utf-8');
}

//删除文件夹
function removeFolder(folderName) {
    var folderPath = 'taskManagerData/' + folderName;
    FS.removeSync(folderPath);
}

//删除文件
function removeTask(taskName, folderName) {
    var taskPath = 'taskManagerData/' + folderName + '/' + taskName;
    FS.unlinkSync(taskPath);
}

//向打开的文件中写入数据
function appendData(folderName, taskName, writeData) {
    var taskPath = 'taskManagerData/' + folderName + '/' + taskName;
    FS.writeFileSync(taskPath, writeData);
}
var app = express();
app.use(express.static("static"));

//每次刷新时,从taskManagerData中读取文件夹列表返回给前端
app.get('/api/load-data-when-refresh', function (req, res) {
    var listFolders = listFolder();
    res.json(listFolders);
});

//每次有文件夹打开时, 文件夹中的文件都要从taskManagerData中读取出来并返回给前端来创建用户界面
app.get('/api/load-task-data-when-fileOpened', function (req, res) {
    var listTasks = listTask(req.query.openedFolder);
    res.json(listTasks);
});

app.get('/api/create-new-folder', function (req, res) {
    createFolder(req.query.name);
    res.json({});
});

app.get('/api/remove-folder', function (req, res) {
    removeFolder(req.query.name);
    res.json({});
});

app.get('/api/remove-clicked-task', function (req, res) {
    removeTask(req.query.openDoc, req.query.openFolder);
    res.json({});
});

app.get('/api/create-new-task', function (req, res) {
    createTask(req.query.folderName, req.query.name);
    res.json({});
});

app.get('/api/append-data-to-task', function (req, res) {
    console.log(req.query.folder + req.query.task + req.query.data);
    appendData(req.query.folder, req.query.task, req.query.data);
    res.json({});
});

app.get('/api/get-editbox-data-from-task', function (req, res) {
    var resData = listTaskData(req.query.folder, req.query.task);
    res.json(resData);
});

app.listen(1337);