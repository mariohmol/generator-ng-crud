"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
// const fs = require("fs");
const path = require("path");
const utils = require("../utils");
const schemaParser = require('../utils/schema-parser');
module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay("Welcome to the " + chalk.red("Angular 2 CRUD") + " generator!")
    );

    var prompts = [
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname
      },
      {
        type: "input",
        name: "description",
        message: "Your project description"
      },
      {
        type: "input",
        name: "version",
        message: "Your project version",
        default: "0.1.0"
      },
      {
        type: "input",
        name: "baseurl",
        message: "Server API URL",
        default: "http://localhost:3500"
      },
      {
        type: "input",
        name: "relativeurl",
        message: "Server relative API URL",
        default: "/api"
      },
      {
        type: "input",
        name: "dataModel",
        message: "Relative path for your JSONSchemas folder",
        default: "../schema"
      }
    ];

    return this.prompt(prompts).then(
      function (props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }.bind(this)
    );
  }

  writing() {
    console.log("after calling readFile", path.join(__dirname, this.props.dataModel));

    const r = schemaParser(this.props.dataModel, this.props.baseurl)
      .then(r => {
        const models = Object.keys(r.schemas).map(s => r.schemas[s].schema);
        var entities = utils.getEntities(r.schemas, ["relativeURI"]);
        console.log(entities);
        (makeApp.bind(this))(models, entities);
        (makeBaseEntities.bind(this))(entities);
        (makeEntities.bind(this))(entities, this.props.relativeurl);
      });
  }

  install() {
    // this.installDependencies();
  }
};



/**
 * Generate App Process
 * @param {*} models 
 */
function makeApp(models, entities) {
  
  this.fs.copyTpl(
    this.templatePath("_package.json"),
    this.destinationPath("package.json"),
    {
      name: this.props.name,
      description: this.props.description,
      version: this.props.version
    }
  );

  this.fs.copyTpl(
    this.templatePath("_README.md"),
    this.destinationPath("README.md"),
    {
      name: this.props.name,
      description: this.props.description,
      version: this.props.version,
      dataModel: this.props.dataModel,
      models: JSON.stringify(models, null, 2)
    }
  );

  const filesCopy = {
    '.angular-cli.json': '.angular-cli.json',
    '.editorconfig': '.editorconfig',
    '.gitignore': '.gitignore',
    '.gitignore': '.gitignore',
    'karma.conf.js': 'karma.conf.js',
    'protractor.conf.js': 'protractor.conf.js',
    '_tsconfig.json': 'tsconfig.json',
    '_tslint.json': 'tslint.json',
    'src/assets/.gitkeep': 'src/assets/.gitkeep',
    'src/environments/environment.prod.ts': 'src/environments/environment.prod.ts',
    'src/environments/environment.ts': 'src/environments/environment.ts',
    'src/favicon.ico': 'src/favicon.ico',
    'src/test.ts': 'src/test.ts',
    'src/tsconfig.app.json': 'src/tsconfig.app.json',
    'src/tsconfig.spec.json': 'src/tsconfig.spec.json',
    'src/typings.d.ts': 'src/typings.d.ts',
    'src/styles.css': 'src/styles.css',
    'src/_global.css': 'src/global.css',
    'src/_polyfills.ts': 'src/polyfills.ts',
    'src/_vendor.ts': 'src/vendor.ts',
    'src/_main.ts': 'src/main.ts',
    'src/app/_api.ts': 'src/app/api.ts',
    'src/app/_app.component.ts': 'src/app/app.component.ts',
    'src/app/app.component.html': 'src/app/app.component.html',
    'src/app/app.component.css': 'src/app/app.component.css',
    'src/app/_app.module.ts': 'src/app/app.module.ts',
    'src/app/_index.ts': 'src/app/index.ts',
    "src/_index.html": "src/index.html",
    "src/app/_config.ts": "src/app/config.ts",
  };
  runFiles(this, filesCopy, {
    name: this.props.name,
    baseurl: this.props.baseurl,
    entities
  });
}

function makeBaseEntities(entities) {
  // Src/app/store/*
  const cp = {
    // "src/app/_routes.ts": "src/app/routes.ts",
    "src/app/store/_index.ts": "src/app/store/index.ts",
    "src/app/store/_helper.ts": "src/app/store/helper.ts",
    "src/app/containers/_home.ts": "src/app/containers/home.ts",
    "src/app/store/_state.ts": "src/app/store/state.ts",
    "src/app/containers/_dashboard.ts": "src/app/containers/dashboard.ts",
    "src/app/containers/_index.ts": "src/app/containers/index.ts",
    "src/app/models/_index.ts": "src/app/models/index.ts",
    // "src/app/ui/_index.ts": "src/app/ui/index.ts"
  };
  runFiles(this, cp, {
    entities: entities
  });
}


/**
 * Generate entitie folders with models, services, components and views
 * @param {*} entities 
 */
function makeEntities(entities, relativeURI) {
  entities.forEach(entity => {

    var relations = utils.getRelations(entity, entities);

    const data = {
      entity: entity,
      relativeURI: relativeURI || "",
      relations
    };

    const files = {
      "src/app/models/_entity.ts": "src/app/models/" + entity.uncapitalize + ".ts",
      "src/app/services/_entity.ts": `src/app/${entity.uncapitalize}/${entity.uncapitalize}.service.ts`,
      "src/app/module/_entity.ts": `src/app/${entity.uncapitalize}/${entity.uncapitalize}.module.ts`,
      "src/app/routing/_entity.ts": `src/app/${entity.uncapitalize}/${entity.uncapitalize}.routing.ts`,

      // CONTROLLERS
      "src/app/ui/_entityView.ts": `src/app/${entity.uncapitalize}/${entity.uncapitalize}View.component.ts`,
      "src/app/ui/_entityCreate.ts": `src/app/${entity.uncapitalize}/${entity.uncapitalize}Create.component.ts`,
      "src/app/ui/_entityDelete.ts": `src/app/${entity.uncapitalize}/${entity.uncapitalize}Delete.component.ts`,
      "src/app/ui/_entityEdit.ts": `src/app/${entity.uncapitalize}/${entity.uncapitalize}Edit.component.ts`,
      "src/app/ui/_entityList.ts": `src/app/${entity.uncapitalize}/${entity.uncapitalize}List.component.ts`,

      // VIEW
      "src/app/ui/_entityView.html": `src/app/${entity.uncapitalize}/${entity.uncapitalize}View.component.html`,
      "src/app/ui/_entityCreate.html": `src/app/${entity.uncapitalize}/${entity.uncapitalize}Create.component.html`,
      "src/app/ui/_entityDelete.html": `src/app/${entity.uncapitalize}/${entity.uncapitalize}Delete.component.html`,
      "src/app/ui/_entityEdit.html": `src/app/${entity.uncapitalize}/${entity.uncapitalize}Edit.component.html`,
      "src/app/ui/_entityList.html": `src/app/${entity.uncapitalize}/${entity.uncapitalize}List.component.html`
    };

    runFiles(this, files, data);
  });
}

/**
 * ex: runFiles(this, files, data)
 * @param {*} run   
 * @param {*} files 
 * @param {*} data 
 */
function runFiles(run, files, data){
  for (let from in files) {
    const to = files[from];
    run.fs.copyTpl(
      run.templatePath(from),
      run.destinationPath(to),
      data
    );
  }
}