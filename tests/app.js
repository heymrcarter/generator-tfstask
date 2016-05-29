var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('tfstask:app', function () {
    var prompts = {
        taskname: 'TestTask',
        friendlyname: 'test task',
        description: 'Test description'
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
});