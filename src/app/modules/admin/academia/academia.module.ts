import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AcademiaComponent} from './academia.component';
import {MatCardModule} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';

const academiaRoutes: Route[] = [
    {
        path     : '',
        component: AcademiaComponent
    }
    /*{
        path     : '',
        pathMatch : 'full',
        redirectTo  : 'alumno'
    },
    {
        path: 'alumno',
        component: AlumnoComponent,
        children: [
            {
                path: '',
                component: AlumnoComponent
            }
        ]
    }*/
];

@NgModule({
    declarations: [
        AcademiaComponent
    ],
    imports: [
        RouterModule.forChild(academiaRoutes),
        MatCardModule,
        NgForOf,
        NgIf
    ]
})
export class AcademiaModule
{
}
