import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CursoService} from './curso.service';
import {Curso} from './curso';
import {FuseConfirmationService, FuseConfirmationModule} from '../../../../@fuse/services/confirmation';
import {Alumno} from '../alumno/alumno';
import {AlumnoService} from '../alumno/alumno.service';
import {Router} from '@angular/router';

@Component({
    selector     : 'curso',
    templateUrl  : './curso.component.html',
    styleUrls: ['./curso.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CursoComponent implements OnInit {

    //public cursos: Curso [];
    public alumnos: Alumno [];

    estadoTablaA: boolean;
    /**
     * Constructor
     */
    constructor(private _cursoService: CursoService, private _alumnoService: AlumnoService, private _fuseConfirmationService: FuseConfirmationService, private router: Router)
    {
    }

    ngOnInit(): void{
        this.estadoTablaA=false;
       const dialogRef = this._fuseConfirmationService.open({
            title: 'Listar',
            message: 'Seguro',
            actions: {
                confirm: {
                    label: 'Listar'
                }
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
        });
        //this._alumnoService.getAlumnos().subscribe(data =>this.alumnos=data);

    }

    getAlumnos(){
        if(this.estadoTablaA === false){
            this.estadoTablaA=true;
        }else{
            this.estadoTablaA=false;
        }
        this._alumnoService.getAlumnos().subscribe(data =>this.alumnos=data);
    }

    obtenerEmpleados() {
        this._alumnoService.getAlumnos().subscribe(data =>this.alumnos=data);
    }

    verDetallesAlumno(id: string){
        this.router.navigate(['alumno',id]);
    }

    eliminarAlumno(id: string){
        //No es necesario un componente
        this._alumnoService.deleteAlumnoById(id).subscribe(data => {
            console.log(data);
            this.obtenerEmpleados();
        });
    }

    actualizarAlumno(id: string){
        this.router.navigate(['detalles-alumno',id]);
    }

    registrarAlumno(){
        this.router.navigate(['registrar-alumno']);
    }

}
