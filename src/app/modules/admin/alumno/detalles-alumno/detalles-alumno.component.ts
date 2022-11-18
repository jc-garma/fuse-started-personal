import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AlumnoService} from '../alumno.service';
import {Alumno} from '../alumno';
import {FuseConfirmationService, FuseConfirmationModule} from '../../../../../@fuse/services/confirmation';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'detalles-alumno',
  templateUrl: './detalles-alumno.component.html',
  styleUrls: ['./detalles-alumno.component.scss']
})
export class DetallesAlumnoComponent implements OnInit {

    public alumnos: Alumno [];
    alumno: Alumno = new Alumno();
    id: string;

    /**
     * Constructor
     */
    constructor(private _alumnoService: AlumnoService, private _fuseConfirmationService: FuseConfirmationService, private route:ActivatedRoute, private router:Router)
    {
    }

    ngOnInit(): void{
        this.id = this.route.snapshot.params['id'];
        console.log(this.id);
        this._alumnoService.getAlumnoById(this.id).subscribe(data =>this.alumno=data);
    }

    onSubmit(){
        console.log('Vamos a actualizar llamada a _alumnoService');
        this._alumnoService.updateAlumno(this.id, this.alumno).subscribe(data => this.irAListaAlumnos());
    }

    irAListaAlumnos(){
        this.router.navigate(['curso']);
        console.log(`Alumno actualizado. El alumno ${this.alumno.name} ha sido actualizado con exito`);
    }
}
