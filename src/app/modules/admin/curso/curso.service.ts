import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Curso} from './curso';
import {BehaviorSubject, Observable, tap} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CursoService {

    private _cursos: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient){}


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get activities
     */
    getCursos(): Observable<any>
    {
        return this._httpClient.get<Curso[]>('api/apps/academia/curso').pipe(
            tap((response: Curso[]) => {
                this._cursos.next(response);
            })
        );
    }



}
