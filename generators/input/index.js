var generators = require('yeoman-generator');
var path = require('path');
var fs = require('fs');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
        
        this.config = JSON.parse(fs.readFileSync(this.destinationPath('.tfstaskrc')));
        this.taskJson = path.join(this.config.taskDir, 'task.json');
    },
    
    prompting: function () {
        var done = this.async();
        var task = JSON.parse(fs.readFileSync(this.taskJson));
        
        var groups = [{ name: 'Default', value: 'Default' }];
        
        task.groups.map(function (group) {
            groups.push({
                name: group.displayName,
                value: group.name
            }); 
        });
        
        var prompts = [
            {
                name: 'name',
                message: 'What is the input name?'    
            },
            {
                name: 'type',
                message: 'What is the input type?'
            },
            {
                name: 'label',
                message: 'What is the label text?'
            },
            {
                name: 'defaultValue',
                message: 'What is the default value?'
            },
            {
                name: 'helpMarkDown',
                message: 'What is the help text?'
            },
            {
                name: 'required',
                message: 'Is this a required input?',
                type: 'confirm',
                default: true
            },
            {
                type: 'list',
                name: 'group',
                message: 'What group does this input belong in?',
                choices: groups
            }
        ];
        
        this.prompt(prompts, function (answers) {
            this.name = answers.name;
            this.type = answers.type;
            this.label = answers.label;
            this.defaultValue = answers.defaultValue || "";
            this.helpMarkDown = answers.helpMarkDown || "";
            this.required = answers.required;
            this.group = answers.group;
            
            done();
        }.bind(this));
    },
    
    writing: {
        taskJson: function () {
            var task = JSON.parse(fs.readFileSync(this.taskJson));
            
            var input = {
                name: this.name,
                type: this.type,
                label: this.label,
                defaultValue: this.defaultValue,
                helpMarkDown: this.helpMarkDown,
                required: this.required,
                group: this.group
            };
            
            task.inputs.push(input);
            
            fs.writeFileSync(this.destinationPath(this.taskJson), JSON.stringify(task, null, 4));
        }   
    }
});