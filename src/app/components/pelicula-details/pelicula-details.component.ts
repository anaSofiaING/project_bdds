import { Component, Input, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/services/peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula } from 'src/app/models/pelicula';
import { Resena } from 'src/app/models/resena';
import { ElencoService } from 'src/app/services/elenco.service';
import { ResenaService } from 'src/app/services/resena.service';
import { Actor } from 'src/app/models/actor';
import { DirectorService } from 'src/app/services/director.service';
import { Director } from 'src/app/models/director';
import { ResenaFull } from 'src/app/models/resena';
import { ActorService } from 'actor.service';

@Component({
  selector: 'app-pelicula-details',
  templateUrl: './pelicula-details.component.html',
  styleUrls: ['./pelicula-details.component.css']
})
export class PeliculaDetailsComponent implements OnInit {


  @Input() viewMode = false;

  @Input() currentPelicula: Pelicula = {
    nombre: '',
    idpelicula: '',
    sinopsis: ''
  };
  currentIndex = -1;
  message = '';
  pais:String="";
  myPuntuacion:any=0;
  resenas?:ResenaFull[];
  actores?:Actor[];
  thisactor:Actor={};
  thisdirector:Director={};
  resena:Resena={
      calificacion: 0,
      critica: '',
      titulo: ''
  }
  perfil:any;
  id :any =this.route.snapshot.params["id"];

  constructor(
    private peliculaService: PeliculaService,
    private route: ActivatedRoute, private DirectorService : DirectorService,
    private actorService : ActorService, private resenaService:ResenaService, private ElencoService:ElencoService) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getPelicula(this.route.snapshot.params["id"]);
      this.getResenas();
      this.getElenco();
      this.getDirector();
      this.perfil=localStorage.getItem('perfil');
    }
  }

  getPelicula(id: string): void {
    this.peliculaService.get(id)
      .subscribe({
        next: (data) => {
          this.currentPelicula = data;
          this.getPais();
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  getPais():void{
    switch(this.currentPelicula.pais){
      case 1: this.pais="México";break;
      case 2: this.pais="USA";break;
      case 3: this.pais="Reino Unido";break;
      case 4: this.pais="España";break;
      case 5: this.pais="Canadá";break;
    }
  }

  getResenas(): void {
    this.resenaService.findByTitle(this.id)
      .subscribe({
        next: (data) => {
          this.resenas = data;
          console.log(data);
          if(this.resenas){
            for(let i=0; i<this.resenas.length; i++)
              if(this.resenas[i].idusuario==this.perfil)
                this.myPuntuacion=this.resenas[i].calificacion;
          }
        },
        error: (e) => console.error(e)
      });
  }
  getElenco():void{
    this.ElencoService.get(this.id)
      .subscribe({
        next: (data) => {
          this.actores = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    }

  
  saveResena(): void {
    const data = {
      idpelicula: this.currentPelicula.idpelicula,
      calificacion: this.resena.calificacion,
      critica: this.resena.critica,
      titulo: this.resena.titulo,
      idusuario: localStorage.getItem('perfil')
    };

    this.resenaService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });

    this.getResenas();
     
  }

  getDirector():void{
    this.DirectorService.getAll()
    .subscribe({
      next: (data) => {
        if(data){
          for(let i=0; i< data.length; i++){
            let name=data[i].nombre+" "+data[i].apellido;
            if(name==this.currentPelicula.director)
              this.thisdirector = data[i];
          }
        }
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  } 

  getActor(dato:Actor):void{
    this.thisactor=dato;
  } 
  /*updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentTutorial.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }*/
  /*
  updateTutorial(): void {
    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tutorials']);
        },
        error: (e) => console.error(e)
      });
  }*/

}