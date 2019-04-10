import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserItemComponent } from './components/users/user-item/user-item.component';
import { AppService } from './app.service';
import { PipesModule } from './pipes/pipes.module';
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    UsersComponent,
    UserDetailComponent,
    UserItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule
  ],
  exports: [PipesModule],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {}
