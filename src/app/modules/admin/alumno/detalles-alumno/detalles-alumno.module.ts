import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { DetallesAlumnoComponent } from './detalles-alumno.component';

const cursoRoutes: Route[] = [
    {
        path     : ':id',
        component: DetallesAlumnoComponent
    }
];

@NgModule({
    declarations: [
        DetallesAlumnoComponent
    ],
    imports: [
        RouterModule.forChild(cursoRoutes),
        NgForOf,
        NgIf,
        FormsModule,
    ]
})
export class DetallesAlumnoModule
{
}
