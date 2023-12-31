import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { GuiComponent } from './components/gui/gui.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TablaLogicaComponent } from './components/tabla-logica/tabla-logica.component';
import { AssetComponent } from './components/gui/asset/asset.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GuiComponent,
    DropdownComponent,
    TablaLogicaComponent,
    AssetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
