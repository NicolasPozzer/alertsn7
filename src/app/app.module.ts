import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TiketComponent } from './components/tiket/tiket.component';
import { GuiComponent } from './components/gui/gui.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TiketComponent,
    GuiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
