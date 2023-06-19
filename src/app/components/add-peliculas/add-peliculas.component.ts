import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PeliculaService } from 'src/app/services/peliculas.service';
import { Pelicula } from 'src/app/models/pelicula';

@Component({
  selector: 'app-add-peliculas',
  templateUrl: './add-peliculas.component.html',
  styleUrls: ['./add-peliculas.component.css']
})
export class AddPeliculasComponent implements OnInit {
  @Input() viewMode = false;

  currentIndex = -1;
  peliculas?: Pelicula[];
  currentPelicula: Pelicula = {};
  movies:Pelicula[]=[];
  nomgen:String="";
  genero:number=0;

  constructor(private route: ActivatedRoute, private router: Router, private peliculaService: PeliculaService) { }

  ngOnInit(): void {
     if (!this.viewMode) {
      this.genero=this.route.snapshot.params["id"];
      this.getPeliculas(this.route.snapshot.params["id"]);
    }
  }

  setActivePelicula(Pelicula: Pelicula, index: number): void {
    console.log(Pelicula);
    this.currentPelicula = Pelicula;
    this.currentIndex = index;
    this.router.navigate(['/peliculas/'+this.currentPelicula.idpelicula]);
  }

  getPeliculas(id:number){
    let movie : Pelicula;
    this.peliculaService.getAll()
      .subscribe({
        next: (data) => {
          this.peliculas = data;
          console.log(data);
          if(this.peliculas){
            for(let i=0; i< this.peliculas.length; i++){
              if(this.peliculas[i].genero==id){
                movie=this.peliculas[i];
                this.movies?.push(movie);
                switch(this.peliculas[i].genero){
                  case 1: this.nomgen="Thriller";break;
                  case 2: this.nomgen="Ciencia Ficción";break;
                  case 3: this.nomgen="Acción";break;
                  case 4: this.nomgen="Drama";break;
                  case 5: this.nomgen="Comedia";break;
                  case 6: this.nomgen="Suspense";break;
                }
              }
            }
          }
          console.log(this.movies);
        },
        error: (e) => console.error(e)
      });
  }


}
