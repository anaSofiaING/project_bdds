import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResenaService } from 'src/app/services/resena.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Input() viewMode = false;
  
  cont:number=0;
  pais:String="";
  user:Usuario={};
  currentUsuario: Usuario = {
    nombre: this.user.nombre,
    apellido: this.user.apellido,
    correo: '',
    contrasena: '',
    edad:0,
    foto:'', 
    pais: 0
  };
  
  message = '';

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute, private resenaService : ResenaService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUsuario(this.route.snapshot.params["id"]);
      this.contador();
    }
  }
  getUsuario(id: string): void {
    this.usuarioService.get(localStorage.getItem('perfil'))
      .subscribe({
        next: (data) => {
          this.user = data;
          this.getPais();
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  salir():void{
    localStorage.removeItem('perfil');
    this.router.navigate(["/inicio"]);
  }
  update():void{
      console.log(this.currentUsuario.edad);

        const data = {
          nombre: this.user.nombre,
          apellido: this.user.apellido,
          correo: this.currentUsuario.correo,
          contrasena: this.user.contrasena,
          edad: this.currentUsuario.edad,
          foto: this.currentUsuario.foto, 
          pais: this.currentUsuario.pais
        };
    
        this.usuarioService.update(this.user.id, data)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The usuario was updated successfully!';
        },
        error => {
          console.log(error);
        });

      }

      contador():void{
        this.resenaService.getAll()
        .subscribe({
          next: (data) => {
            console.log(data);
            if(data){
              for(let i=0; i<data.length; i++)
                if(data[i].idusuario==this.user.id)
                  this.cont++;
            }
          },
          error: (e) => console.error(e)
        });
      }

      getPais():void{
        switch(this.user.pais){
          case 1: this.pais="México";break;
          case 2: this.pais="USA";break;
          case 3: this.pais="Reino Unido";break;
          case 4: this.pais="España";break;
          case 5: this.pais="Canadá";break;
        }
      }
}
