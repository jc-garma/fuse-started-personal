import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CursoService} from '../curso/curso.service';
import {Curso} from '../curso/curso';
import {FuseConfirmationService, FuseConfirmationModule} from '../../../../@fuse/services/confirmation';

@Component({
    selector     : 'academia',
    templateUrl  : './academia.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AcademiaComponent implements OnInit {
    public cursos: Curso[];

    estadoTablaC: boolean;

    /**
     * Constructor
     */
    constructor(private _cursoService: CursoService, private _fuseConfirmationService: FuseConfirmationService)
    {
    }

    ngOnInit(): void{
        this.estadoTablaC=false;
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
        //this._cursoService.getCursos().subscribe(data => this.cursos=data);
        //this._alumnoService.getAlumnos().subscribe(data =>this.alumnos=data);
    }

    getCursos(){
        if(this.estadoTablaC === false){
            this.estadoTablaC=true;
        }else{
            this.estadoTablaC=false;
        }
        this._cursoService.getCursos().subscribe(data => this.cursos=data);
    }
}
