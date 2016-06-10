var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');
var mkdir = require('mkdirp');
var fs = require('fs');

describe('tfstask:input', function () {
    var testTask = {
        taskname: 'TestTask',
        friendlyname: 'test task',
        taskdescription: 'Test description',
        category: 'Test',
        author: 'Test Author'
    };
    
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/input'))
            .inTmpDir(function (dir) {
                var tmpTask = path.join(dir, testTask.taskname);
                var task = {
                    name: testTask.taskname,
                    friendlyName: testTask.friendlyname,
                    description:testTask.description,
                    category: testTask.category,
                    author: testTask.author,
                    groups: [
                        {
                            name: "TestGroup",
                            displayName: "Test Group",
                            isExpanded: true
                        }
                    ],
                    inputs: []
                };
                
                mkdir(tmpTask);
                
                fs.writeFileSync(path.join(tmpTask, 'task.json'), JSON.stringify(task, null, 4));
                
                var config = {
                    taskDir: testTask.taskname  
                };
                
                fs.writeFileSync('.tfstaskrc', JSON.stringify(config, null, 4));
            })
            .withPrompts({
                name: 'TestInput',
                type: 'string',
                label: 'Test Input',
                defaultValue: 'value',
                helpMarkDown: 'A field to test with',
                required: true
            })
            .on('end', done);    
    });
    
    it('Should update the task.json with a new input', function () {
        var taskJson = path.join(testTask.taskname, 'task.json');
        
        assert.fileContent(taskJson, /\"name\"\:\s\"TestInput\"/);
        assert.fileContent(taskJson, /\"type\"\:\s\"string\"/);
        assert.fileContent(taskJson, /\"label\"\:\s\"Test Input\"/);
        assert.fileContent(taskJson, /\"defaultValue\"\:\s\"value\"/);
        assert.fileContent(taskJson, /\"helpMarkDown\"\:\s\"A\sfield\sto\stest\swith\"/);
        assert.fileContent(taskJson, /\"required\"\:\strue/);
    });
    
});