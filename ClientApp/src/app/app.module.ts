import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { SettingsComponent } from "./settings/settings.component";
import { TodoBoardsComponent } from "./todo-boards/todo-boards.component";
import { TodoBoardNameInputComponent } from "./todo-board-name-input/todo-board-name-input.component";
import { TodoItemContentInputComponent } from "./todo-item-content-input/todo-item-content-input.component";
import { HoverClassDirective } from "src/directives/hover-class.directive";
import { CallbackPipe } from "src/pipes/callback.pipe";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SettingsComponent,
    TodoBoardsComponent,
    TodoBoardNameInputComponent,
    TodoItemContentInputComponent,
    HoverClassDirective,
    CallbackPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: TodoBoardsComponent, pathMatch: "full" },
      { path: "settings", component: SettingsComponent }
    ]),
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
