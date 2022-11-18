import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Alumno} from './alumno';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AlumnoService {

    private _alumno: BehaviorSubject<Alumno | null> = new BehaviorSubject(null);
    private _alumnos: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient){}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for alumnos
     */
    get alumnos$(): Observable<Alumno[]>
    {
        return this._alumnos.asObservable();
    }

    /**
     * Get alumnos
     */
    getAlumnos(): Observable<any>
    {
        return this._httpClient.get<Alumno[]>('api/apps/academia/alumno').pipe(
            tap((response: Alumno[]) => {
                this._alumnos.next(response);
            })
        );
    }

    /**
     * Get alumno by id
     */
    getAlumnoById(id: string): Observable<Alumno>
    {
        return this._alumnos.pipe(
            take(1),
            map((alumnos) => {

                // Find the alumn
                const alumno = alumnos.find(item => item.id === id) || null;

                // Update the alumn
                this._alumno.next(alumno);

                // Return the alumn
                return alumno;
            }),
            switchMap((alumno) => {

                if ( !alumno )
                {
                    return throwError('Could not found contact with id of ' + id + '!');
                }

                return of(alumno);
            })
        );
        //return;
    }

    /**
     * Delete the alumno
     *
     * @param id
     */
    deleteAlumnoById(id: string): Observable<boolean>
    {
        return this.alumnos$.pipe(
            take(1),
            switchMap(alumnos => this._httpClient.delete('api/apps/academia/alumno', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted alumn
                    const index = alumnos.findIndex(item => item.id === id);

                    // Delete the alumn
                    alumnos.splice(index, 1);

                    // Update the alumns
                    this._alumnos.next(alumnos);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Patch Update alumno
     *
     * @param id
     * @param alumno
     */
    updateAlumno(id: string, alumno: Alumno): Observable<Alumno>
    {
        return this.alumnos$.pipe(
            take(1),
            switchMap(alumnos => this._httpClient.patch<Alumno>('api/apps/academia/alumno', {
                id,
                alumno
            }).pipe(
                map((updatedAlumno) => {
                    //Solo se puede actualizar uno ya existente en la tabla
                    // Find the index of the updated alumn
                    const index = alumnos.findIndex(item => item.id === id);

                    // Update the alumn
                    alumnos[index] = updatedAlumno;

                    // Update the alumn
                    this._alumnos.next(alumnos);

                    // Return the updated alumn
                    return updatedAlumno;
                })
            ))
        );
    }

    /**
     * Create alumn
     *
     * @param alumno
     */
    registerAlumno(alumno: Alumno): Observable<Alumno>
    {
        return this.alumnos$.pipe(
            take(1),
            switchMap(tags => this._httpClient.post<Alumno>('api/apps/academia/alumno', {alumno}).pipe(
                map((newAlumno) => {

                    // Update the tags with the new tag
                    this._alumnos.next([...tags, newAlumno]);

                    // Return new tag from observable
                    return newAlumno;
                })
            ))
        );
    }


}
