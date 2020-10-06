# angular-todo-app

A todo app  written with Angular and Dotnet Core.

## Running the app
```
dotnet build
dotnet watch run
```

## Updating the database schema
```bash
dotnet ef migrations add whatever_migration_name
dotnet ef database update
```

## Front end development
Move into the client directory using `cd ClientApp` and then execute any of the following:

### - Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### - Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### - Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### - Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### - Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>