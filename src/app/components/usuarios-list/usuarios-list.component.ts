import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  usuarios?: Usuario[];
  currentUsuario: Usuario = {};
  currentIndex = -1;
  nombre = '';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.retrieveUsuarios();
  }

  retrieveUsuarios(): void {
    this.usuarioService.getAll()
      .subscribe({
        next: (data) => {
          this.usuarios = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveUsuarios();
    this.currentUsuario = {};
    this.currentIndex = -1;
  }

  setActiveUsuario(usuario: Usuario, index: number): void {
    this.currentUsuario = usuario;
    this.currentIndex = index;
  }

  removeAllUsuarios(): void {
    this.usuarioService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchNombre(): void {
    this.currentUsuario = {};
    this.currentIndex = -1;

    this.usuarioService.findByTitle(this.nombre)
      .subscribe({
        next: (data) => {
          this.usuarios = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  cambiarVal(value : number):void{
    if(this.usuarios){
      if(value==0){
        this.retrieveUsuarios();
      }else{
        this.usuarioService.findByPais(value)
        .subscribe({
          next: (data) => {
            this.usuarios = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
      }
    }
}

}