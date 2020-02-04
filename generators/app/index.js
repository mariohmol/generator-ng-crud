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
        (makeApp.bind(this))(models);
        (makeBaseEntities.bind(this))(entities);
        (makeEntities.bind(this))(entities, this.props.relativeurl);
      });
  }

  install() {
    this.installDependencies();
  }
};



/**
 * Generate App Process
 * @param {*} models 
 */
function makeApp(models) {
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

  // *

  this.fs.copy(
    this.templatePath("_tsconfig.json"),
    this.destinationPath("tsconfig.json")
  );

  this.fs.copy(
    this.templatePath("_tslint.json"),
    this.destinationPath("tslint.json")
  );

  this.fs.copy(
    this.templatePath("_webpack.config.js"),
    this.destinationPath("webpack.config.js")
  );

  // Src/*

  this.fs.copy(
    this.templatePath("src/_global.css"),
    this.destinationPath("src/global.css")
  );

  this.fs.copy(
    this.templatePath("src/_polyfills.ts"),
    this.destinationPath("src/polyfills.ts")
  );

  this.fs.copy(
    this.templatePath("src/_vendor.ts"),
    this.destinationPath("src/vendor.ts")
  );

  this.fs.copy(
    this.templatePath("src/_main.ts"),
    this.destinationPath("src/main.ts")
  );

  this.fs.copyTpl(
    this.templatePath("src/_index.html"),
    this.destinationPath("src/index.html"),
    {
      name: this.props.name
    }
  );

  // Src/app/*

  this.fs.copy(
    this.templatePath("src/app/_api.ts"),
    this.destinationPath("src/app/api.ts")
  );

  this.fs.copy(
    this.templatePath("src/app/_app.ts"),
    this.destinationPath("src/app/app.ts")
  );

  this.fs.copy(
    this.templatePath("src/app/_index.ts"),
    this.destinationPath("src/app/index.ts")
  );

  this.fs.copyTpl(
    this.templatePath("src/app/_config.ts"),
    this.destinationPath("src/app/config.ts"),
    {
      baseurl: this.props.baseurl
    }
  );



}

function makeBaseEntities(entities) {


  this.fs.copyTpl(
    this.templatePath("src/app/_routes.ts"),
    this.destinationPath("src/app/routes.ts"),
    {
      entities: entities
    }
  );

  // Src/app/store/*

  this.fs.copy(
    this.templatePath("src/app/store/_helper.ts"),
    this.destinationPath("src/app/store/helper.ts")
  );

  this.fs.copyTpl(
    this.templatePath("src/app/store/_index.ts"),
    this.destinationPath("src/app/store/index.ts"),
    {
      entities: entities
    }
  );

  this.fs.copy(
    this.templatePath("src/app/containers/_home.ts"),
    this.destinationPath("src/app/containers/home.ts")
  );

  this.fs.copyTpl(
    this.templatePath("src/app/store/_state.ts"),
    this.destinationPath("src/app/store/state.ts"),
    {
      entities: entities
    }
  );

  this.fs.copyTpl(
    this.templatePath("src/app/containers/_dashboard.ts"),
    this.destinationPath("src/app/containers/dashboard.ts"),
    {
      entities: entities
    }
  );

  this.fs.copyTpl(
    this.templatePath("src/app/containers/_index.ts"),
    this.destinationPath("src/app/containers/index.ts"),
    {
      entities: entities
    }
  );

  this.fs.copyTpl(
    this.templatePath("src/app/models/_index.ts"),
    this.destinationPath("src/app/models/index.ts"),
    {
      entities: entities
    }
  );

  this.fs.copyTpl(
    this.templatePath("src/app/services/_index.ts"),
    this.destinationPath("src/app/services/index.ts"),
    {
      entities: entities
    }
  );

  this.fs.copyTpl(
    this.templatePath("src/app/ui/_index.ts"),
    this.destinationPath("src/app/ui/index.ts"),
    {
      entities: entities
    }
  );
}


/**
 * Generate entitie folders with models, services, components and views
 * @param {*} entities 
 */
function makeEntities(entities, relativeURI) {
  entities.forEach(entity => {
    this.fs.copyTpl(
      this.templatePath("src/app/models/_entity.ts"),
      this.destinationPath("src/app/models/" + entity.uncapitalize + ".ts"),
      {
        entity: entity
      }
    );

    this.fs.copyTpl(
      this.templatePath("src/app/services/_entity.ts"),
      this.destinationPath("src/app/services/" + entity.uncapitalize + ".ts"),
      {
        entity: entity,
        relativeURI: relativeURI || ""
      }
    );

    var relations = utils.getRelations(entity, entities);

    this.fs.copyTpl(
      this.templatePath("src/app/containers/_entity.ts"),
      this.destinationPath(
        "src/app/containers/" + entity.uncapitalize + ".ts"
      ),
      {
        entity: entity,
        relations: relations
      }
    );

    this.fs.copyTpl(
      this.templatePath("src/app/ui/_entity.ts"),
      this.destinationPath(
        "src/app/ui/" +
        entity.uncapitalize +
        "/" +
        entity.uncapitalize +
        ".ts"
      ),
      {
        entity: entity,
        relations: relations
      }
    );

    this.fs.copyTpl(
      this.templatePath("src/app/ui/_entityCreate.ts"),
      this.destinationPath(
        "src/app/ui/" +
        entity.uncapitalize +
        "/" +
        entity.uncapitalize +
        "Create.ts"
      ),
      {
        entity: entity,
        relations: relations
      }
    );

    this.fs.copyTpl(
      this.templatePath("src/app/ui/_entityDelete.ts"),
      this.destinationPath(
        "src/app/ui/" +
        entity.uncapitalize +
        "/" +
        entity.uncapitalize +
        "Delete.ts"
      ),
      {
        entity: entity,
        relations: relations
      }
    );

    this.fs.copyTpl(
      this.templatePath("src/app/ui/_entityEdit.ts"),
      this.destinationPath(
        "src/app/ui/" +
        entity.uncapitalize +
        "/" +
        entity.uncapitalize +
        "Edit.ts"
      ),
      {
        entity: entity,
        relations: relations
      }
    );
  });
}