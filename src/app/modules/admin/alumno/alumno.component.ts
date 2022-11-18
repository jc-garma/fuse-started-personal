import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AlumnoService} from './alumno.service';
import {Alumno} from './alumno';
import {FuseConfirmationService, FuseConfirmationModule} from '../../../../@fuse/services/confirmation';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector     : 'alumno',
    templateUrl  : './alumno.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AlumnoComponent implements OnInit {

    public alumnos: Alumno [];
    alumno: Alumno = new Alumno();
    id: string;

    /**
     * Constructor
     */
    constructor(private _alumnoService: AlumnoService, private _fuseConfirmationService: FuseConfirmationService, private route:ActivatedRoute)
    {
    }

    ngOnInit(): void{
        this.id = this.route.snapshot.params['id'];
        console.log(this.id);
        this._alumnoService.getAlumnoById(this.id).subscribe(data =>this.alumno=data);
        //this._alumnoService.getAlumnos().subscribe(data =>this.alumnos=data);
    }
}
