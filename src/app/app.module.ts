import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { AddPeliculasComponent } from './components/add-peliculas/add-peliculas.component';
import { LoginComponent } from './components/login/login.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { UsuarioDetailsComponent } from './components/usuario-details/usuario-details.component';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';
import { PeliculaDetailsComponent } from './components/pelicula-details/pelicula-details.component';
import { ActorDetailsComponent } from './components/actor-details/actor-details.component';
import { DirectorDetailsComponent } from './components/director-details/director-details.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PerfilComponent } from './components/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUsuarioComponent,
    AddPeliculasComponent,
    LoginComponent,
    UsuarioDetailsComponent,
    UsuariosListComponent,
    PeliculasComponent,
    PeliculaDetailsComponent,
    ActorDetailsComponent,
    DirectorDetailsComponent,
    InicioComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
