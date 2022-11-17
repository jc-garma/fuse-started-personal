import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AcademiaComponent} from './academia.component';
import {MatCardModule} from "@angular/material/card";

const academiaRoutes: Route[] = [
    {
        path     : '',
        component: AcademiaComponent
    }
];

@NgModule({
    declarations: [
        AcademiaComponent
    ],
    imports: [
        RouterModule.forChild(academiaRoutes),
        MatCardModule
    ]
})
export class AcademiaModule
{
}
