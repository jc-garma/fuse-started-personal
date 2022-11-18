import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { RegistrarAlumnoComponent } from './registrar-alumno.component';

const cursoRoutes: Route[] = [
    {
        path     : '',
        component: RegistrarAlumnoComponent
    }
];

@NgModule({
    declarations: [
        RegistrarAlumnoComponent
    ],
    imports: [
        RouterModule.forChild(cursoRoutes),
        NgForOf,
        NgIf,
        FormsModule,
    ]
})
export class RegistrarAlumnoModule
{
}
