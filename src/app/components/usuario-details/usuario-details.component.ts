import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { ResenaService } from 'src/app/services/resena.service';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.css']
})
export class UsuarioDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentUsuario: Usuario = {
    nombre: '',
    correo: '',
    contrasena: '',
    foto:''
  };
  pais:String="";
  message = '';
  cont=0;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private resenaService : ResenaService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUsuario(this.route.snapshot.params["id"]);
      this.contador();
    }
  }

  getUsuario(id: string): void {
    this.usuarioService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUsuario = data;
          this.getPais();
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateUsuario(): void {
    this.message = '';

    this.usuarioService.update(this.currentUsuario.id, this.currentUsuario.foto)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  contador():void{
    this.resenaService.getAll()
    .subscribe({
      next: (data) => {
        console.log(data);
        if(data){
          for(let i=0; i<data.length; i++)
            if(data[i].idusuario==this.route.snapshot.params["id"])
              this.cont++;
        }
      },
      error: (e) => console.error(e)
    });
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