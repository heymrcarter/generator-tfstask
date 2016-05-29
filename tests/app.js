var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('tfstask:app', function () {
    before(function (done) {
        var prompts = {
            taskname: 'test',
            friendlyname: 'test',
            description: 'Test description'
        };
        
        helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts(prompts)
            .on('end', done);
    });
    
    it('Should create a readme with task friendly name and description', function () {
        assert.file('README.md');
        assert.fileContent('README.md', /#test/);
        assert.fileContent('README.md', /Test\sdescription/);
    });
});