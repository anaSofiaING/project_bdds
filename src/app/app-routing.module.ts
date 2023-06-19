import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';
import { UsuarioDetailsComponent } from './components/usuario-details/usuario-details.component';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { ActorDetailsComponent } from './components/actor-details/actor-details.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AddPeliculasComponent } from './components/add-peliculas/add-peliculas.component';
import { LoginComponent } from './components/login/login.component';
import { PeliculaDetailsComponent } from './components/pelicula-details/pelicula-details.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'usuarios', component: UsuariosListComponent },
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'usuarios/:id', component: UsuarioDetailsComponent },
  { path: 'add', component: AddUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'generos/:id', component: AddPeliculasComponent },
  { path: 'peliculas/:id', component: PeliculaDetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }