import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AlumnoService} from '../alumno.service';
import {Alumno} from '../alumno';
import {FuseConfirmationService, FuseConfirmationModule} from '../../../../../@fuse/services/confirmation';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'registrar-alumno',
  templateUrl: './registrar-alumno.component.html',
  styleUrls: ['./registrar-alumno.component.scss']
})
export class RegistrarAlumnoComponent implements OnInit {

    alumno: Alumno = new Alumno();

  constructor(private _alumnoService: AlumnoService, private _fuseConfirmationService: FuseConfirmationService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

  }

  onSubmit(){
      this.guardarAlumno();
  }

  guardarAlumno(){
      console.log('Vamos a register llamada a _alumnoService');
      console.log(this.alumno);
      this._alumnoService.registerAlumno(this.alumno).subscribe(data => this.irAListaAlumnos());
  }

    irAListaAlumnos(){
        this.router.navigate(['curso']);
        console.log(`Alumno registrado. El alumno ${this.alumno.name} ha sido registrado con exito`);
    }

}
