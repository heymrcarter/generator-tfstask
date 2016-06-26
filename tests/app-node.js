var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('tfstask:app --node', function () {
    var prompts = {
        taskname: 'TestTask',
        friendlyname: 'test task',
        taskdescription: 'Test description',
        category: 'Test',
        author: 'Test Author'
    };
    
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({node: true})
            .withPrompts(prompts)
            .on('end', done);
    });

    it('Creates the task script', function () {
        assert.file(path.join(prompts.taskname, prompts.taskname + '.js'));
    });

    it('Creates a Node format task.json', function () {
        var taskJson = path.join(prompts.taskname, 'task.json');
        assert.fileContent(taskJson, /\"Node\"\:/);
        assert.fileContent(taskJson, /[$(]{1}currentDirectory[)]{1}[\\]+TestTask.js/);
    });
});