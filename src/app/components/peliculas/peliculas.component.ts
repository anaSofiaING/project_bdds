import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pelicula } from 'src/app/models/pelicula';
import { PeliculaService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  peliculas?: Pelicula[];
  currentPelicula: Pelicula = {};
  currentIndex = -1;
  nombre = '';

  constructor(private PeliculaService: PeliculaService,private router:Router) { }

  ngOnInit(): void {
    this.retrievePeliculas();
  }

  retrievePeliculas(): void {
    this.PeliculaService.getAll()
      .subscribe({
        next: (data) => {
          this.peliculas = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrievePeliculas();
    this.currentPelicula = {};
    this.currentIndex = -1;
  }

  setActivePelicula(Pelicula: Pelicula, index: number): void {
    console.log(Pelicula);
    console.log("soy el id"+Pelicula.idpelicula);
    this.currentPelicula = Pelicula;
    this.currentIndex = index;
    this.router.navigate(['/peliculas/'+this.currentPelicula.idpelicula]);
  }

  removeAllPeliculas(): void {
    this.PeliculaService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchNombre(): void {
    this.currentPelicula = {};
    this.currentIndex = -1;
    
    this.PeliculaService.findByTitle(this.nombre)
      .subscribe({
        next: (data) => {
          this.peliculas = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  cambiarVal(value : number):void{
      if(this.peliculas){
        if(value==0){
          this.retrievePeliculas();
        }else{
          this.PeliculaService.findByPais(value)
          .subscribe({
            next: (data) => {
              this.peliculas = data;
              console.log(data);
            },
            error: (e) => console.error(e)
          });
        }
      }
  }

}