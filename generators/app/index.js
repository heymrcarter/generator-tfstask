var generators = require('yeoman-generator');
var yosay = require('yosay');
var mkdir = require('mkdirp');
var path = require('path');
var uuid = require('node-uuid');

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
                name: 'taskdescription',
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
            this.taskDescription = answers.taskdescription;
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
                    description: this.taskDescription
                });
        },
        taskDir: function () {
            mkdir(this.taskname);
        },
        taskJson: function () {
            this.fs.copyTpl(
                this.templatePath('_task.json'),
                this.destinationPath(path.join(this.taskname, 'task.json')),
                {
                    id: uuid.v4(),
                    taskname: this.taskname,
                    friendlyName: this.friendlyName,
                    taskDescription: this.taskDescription,
                    category: this.category,
                    author: this.author
                }
            );
        },
        icon: function () {
            this.fs.copy(
                this.templatePath('_icon.png'),
                this.destinationPath(path.join(this.taskname, 'icon.png'))
            );  
        },
        script: function () {
            this.fs.copy(
                this.templatePath('_script.ps1'),
                this.destinationPath(path.join(this.taskname, this.taskname + '.ps1'))
            );
        },
        tfstaskrc: function () {
            this.fs.copyTpl(
                this.templatePath('_.tfstaskrc'),
                this.destinationPath('.tfstaskrc'),
                {
                    taskname: this.taskname
                }  
            );
        },
        gitignore: function () {
            this.fs.copyTpl(
                this.templatePath('_.gitignore'),
                this.destinationPath('.gitignore'),
                {}
            );   
        }
    }
});