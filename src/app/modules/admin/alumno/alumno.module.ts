import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {AlumnoComponent} from './alumno.component';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { DetallesAlumnoComponent } from './detalles-alumno/detalles-alumno.component';
import { RegistrarAlumnoComponent } from './registrar-alumno/registrar-alumno.component';

const cursoRoutes: Route[] = [
    {
        path     : ':id',
        component: AlumnoComponent
    }
    /*{
        children : [
            {
                path         : ':id',
                component    : DetallesAlumnoComponent
            }
        ]
    }*/
];

@NgModule({
    declarations: [
        AlumnoComponent,
        //RegistrarAlumnoComponent,
        //DetallesAlumnoComponent
    ],
    imports: [
        RouterModule.forChild(cursoRoutes),
        NgForOf,
        FormsModule,
    ]
})
export class AlumnoModule
{
}
