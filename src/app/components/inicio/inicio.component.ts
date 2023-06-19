import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PeliculaService } from 'src/app/services/peliculas.service';
import { Pelicula } from 'src/app/models/pelicula';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  idUsuario : any;
  currentUsuario :Usuario={}
  peliculas?: Pelicula[];
  pais:String="";
  top3?:Pelicula[];
  topPais0?:Pelicula[];
  topPais1?:Pelicula[];
  topPais2?:Pelicula[];
  topPais3?:Pelicula[];
  currentPelicula: Pelicula = {};
  currentIndex = -1;

  constructor(private UsuarioService:UsuarioService, private PeliculaService: PeliculaService, private router :Router) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('perfil');
    this.getUsuario(this.idUsuario);
    this.retrievePeliculas();
  }

  getUsuario(id: string): void {
    this.UsuarioService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUsuario = data;
          this.getPais();
          console.log(data);
          this.PeliculaService.findByPaisMayor(this.currentUsuario.pais)
          .subscribe({
            next: (data) => {
              this.topPais0 = data;
              console.log(data);
            },
            error: (e) => console.error(e)
          });
        },
        error: (e) => console.error(e)
      });
  }


  retrievePeliculas(): void {
    this.PeliculaService.getPublished()
      .subscribe({
        next: (data) => {
          this.peliculas = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  setActivePelicula(Pelicula: Pelicula, index: number): void {
    console.log(Pelicula);
    console.log("soy el id"+Pelicula.idpelicula);
    this.currentPelicula = Pelicula;
    this.currentIndex = index;
    this.router.navigate(['/peliculas/'+this.currentPelicula.idpelicula]);
  }

  genero(id : number):void{
    this.router.navigate(['/generos/'+id]);
  }

  getPais():void{
    switch(this.currentUsuario.pais){
      case 1: this.pais="México";break;
      case 2: this.pais="USA";break;
      case 3: this.pais="Reino Unido";break;
      case 4: this.pais="España";break;
      case 5: this.pais="Canadá";break;
    }
  }

}
