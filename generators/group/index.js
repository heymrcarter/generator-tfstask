var generators = require('yeoman-generator');
var path = require('path');
var jsonfile = require('jsonfile');
var fs = require('fs');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
        
        this.config = JSON.parse(fs.readFileSync(this.destinationPath('.tfstaskrc')));
    },
    
    prompting: function () {
        var done = this.async();
        
        var prompts = [
            {
                name: 'groupname',
                message: 'What is the group name?',        
            },
            {
                name: 'groupdisplay',
                message: 'What is the display name?'
            },
            {
                name: 'isexpanded',
                type: 'confirm',
                message: 'Expanded by default?',
                default: true
            }
        ];
        
        this.prompt(prompts, function (answers) {
            this.groupName = answers.groupname;
            this.displayName = answers.groupdisplay;
            this.isExpanded = answers.isexpanded;
            
            done(); 
        }.bind(this));
    },
    
    writing: {
        taskJson: function () {
            var taskJson = path.join(this.config.taskDir, 'task.json');
            var task = JSON.parse(fs.readFileSync(taskJson));

            var group = {
                name: this.groupName,
                displayName: this.displayName,
                isExpanded: this.isExpanded  
            };
            
            task.groups.push(group);

            fs.writeFileSync(this.destinationPath(path.join(this.config.taskDir, 'task.json')), JSON.stringify(task, null, 4));
        }
    }
});