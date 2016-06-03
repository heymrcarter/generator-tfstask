var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');
var jsonfile = require('jsonfile');
var mkdir = require('mkdirp');

describe('tfstask:group', function () {
    var testTask = {
        taskname: 'TestTask',
        friendlyname: 'test task',
        taskdescription: 'Test description',
        category: 'Test',
        author: 'Test Author'    
    };
    
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/group'))
            .inTmpDir(function (dir) {
                var tmpTask = path.join(dir, testTask.taskname);
                var task = {
                    name: testTask.taskname,
                    friendlyName: testTask.friendlyname,
                    description: testTask.friendlyname,
                    category: testTask.category,
                    author: testTask.author,
                    groups: [],
                    inputs: []
                };
                
                mkdir(tmpTask);                
                
                jsonfile.writeFileSync(path.join(tmpTask, 'task.json'), task);
                
                var config = {
                    taskDir: testTask.taskname
                };
                
                jsonfile.writeFileSync('.tfstaskrc', config);
            })
            .withPrompts({
                groupname: "TestGroup",
                groupdisplay: "Test Group",
                isexpanded: false
            })
            .on('end', done);
    });
    
    it('Adds a new group object to the groups array in the task.json', function () {
        var taskJson = path.join(testTask.taskname, 'task.json');
        
        assert.file('.tfstaskrc');
        assert.jsonFileContent('.tfstaskrc', {taskDir: testTask.taskname});
        assert.fileContent(taskJson, /\"name\"\:\s\"TestGroup\"/);
        assert.fileContent(taskJson, /\"displayName\"\:\s\"Test\sGroup\"/);
        assert.fileContent(taskJson, /\"isExpanded\"\:\sfalse/);
    });
});