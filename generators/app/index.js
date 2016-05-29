var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
    },
    
    prompting: function () {
        var done = this.async();
        
        this.log(yosay(this.yeoman));
        
        var prompts = [
            {
                name: 'taskname',
                message: 'What is your task\'s name?',
                default: this.appname                
            },
            {
                name: 'friendlyname',
                message: 'What is the friendly name?',
                default: this.appname
            },
            {
                name: 'description',
                message: 'What does your task do?'
            },
            {
                type: 'list',
                name: 'category',
                message: 'What kind of task is this?',
                choices: [
                    {
                        name: 'Build',
                        value: 'Build'
                    },
                    {
                        name: 'Utility',
                        value: 'Utility'
                    },
                    {
                        name: 'Test',
                        value: 'Test'
                    },
                    {
                        name: 'Package',
                        value: 'Package'
                    },
                    {
                        name: 'Deploy',
                        value: 'Deploy'
                    }
                ]
            },
            {
                name: 'author',
                message: 'Who is the author?'
            }
        ];
        
        this.prompt(prompts, function (answers) {
            this.taskname = answers.taskname;
            this.friendlyName = answers.friendlyname;
            this.description = answers.description;
            this.category = answers.category;
            this.author = answers.author;
            
            done();
        }.bind(this));
    },
    
    writing: {
        readme: function () {
            this.fs.copyTpl(
                this.templatePath('_README.md'),
                this.destinationPath('README.md'),
                {
                    taskname: this.friendlyName,
                    description: this.description
                });
        }
    }
});