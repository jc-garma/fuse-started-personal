import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CursoComponent} from './curso.component';
import {NgForOf, NgIf} from '@angular/common';

const cursoRoutes: Route[] = [
    {
        path     : '',
        component: CursoComponent
    }
];

@NgModule({
    declarations: [
        CursoComponent
    ],
    imports: [
        RouterModule.forChild(cursoRoutes),
        NgForOf,
        NgIf
    ]
})
export class CursoModule
{
}
