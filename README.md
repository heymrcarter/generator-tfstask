#TFS Task Generator
[Yeoman](https://yeoman.io) generator to scaffold out a custom build or release task for TFS 2015 or Visual Studio Team Services.

##Usage
To use this generator you need to have Node.js and Yeoman installed.

Download and install Node.js from the [Node.js website](https://nodejs.org/en/download/).

Once you have Node.js installed, you can install Yeoman using the following:

    npm install -g yo
    
To install this generator, run the following:

    npm install -g generator-tfstask
    
###Scaffolding a new task
When you are ready to create a new task, create the root directory for your project and navigate to it in a terminal. Run the following to start the generator:

    yo tfstask
    
Follow the prompts to provide the specifics about your task. When the generator is finished it will have created the following in the project root:

    .
    +-- README.md
    +-- TaskName
    |   +-- icon.png
    |   +-- task.json
    |   +-- TaskName.ps1
    
##License
[MIT](https://opensource.org/licenses/MIT)