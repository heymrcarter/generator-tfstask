var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('tfstask:app', function () {
    var prompts = {
        taskname: 'TestTask',
        friendlyname: 'test task',
        taskdescription: 'Test description',
        category: 'Test',
        author: 'Test Author'
    };
    
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts(prompts)
            .on('end', done);
    });
    
    it('Should create a readme with task friendly name and description', function () {
        assert.file('README.md');
        assert.fileContent('README.md', /#test/);
        assert.fileContent('README.md', /Test\sdescription/);
    });
    
    it('Should create a directory with the task name', function () {
        assert.file(prompts.taskname); 
    });
    
    it('Should create a task.json file', function () {
       assert.file(path.join(prompts.taskname, 'task.json')); 
    });
    
    it('Should assign a guid for the task.json id', function () {
        assert.fileContent(
            path.join(prompts.taskname, 'task.json'),
            /[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/
        );
    });
    
    it('Should assign the user answers to their respective task.json fields', function () {
        var taskJson = path.join(prompts.taskname, 'task.json');
        
        assert.jsonFileContent(taskJson, {name: prompts.taskname});
        assert.jsonFileContent(taskJson, {friendlyName: prompts.friendlyname});
        assert.jsonFileContent(taskJson, {description: prompts.taskdescription});
        assert.jsonFileContent(taskJson, {category: prompts.category});
        assert.jsonFileContent(taskJson, {author: prompts.author});
        assert.fileContent(taskJson, /[$(]{1}currentDirectory[)]{1}[\\]+TestTask.ps1/);
    });
    
    it('Should add a default task icon', function () {
        assert.file(path.join(prompts.taskname, 'icon.png')); 
    });
    
    it('Should create a starter PowerShell script', function () {
        var script = path.join(prompts.taskname, prompts.taskname + '.ps1');
        
        assert.file(script); 
    });
});