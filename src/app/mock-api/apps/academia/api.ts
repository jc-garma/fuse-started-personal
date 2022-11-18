import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import {courses as coursesData} from 'app/mock-api/apps/academia/data';
import {alumnos as alumnosData} from 'app/mock-api/apps/academia/data';
import {Alumno} from 'app/modules/admin/alumno/alumno';

@Injectable({
    providedIn: 'root'
})
export class AcademiaMockApi
{
    private _courses: any[] = coursesData;
    private _alumnos: any[] = alumnosData;

    private alumno: Alumno;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Alumnos - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/academia/curso')
            .reply(() => {

                // Clone the alumns
                const courses = cloneDeep(this._courses);

                return [200, courses];
            });

        //-----------------------------------------------------------------------------------------------------
        // @ Alumnos - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/academia/alumno')
            .reply(() => {

                // Clone the alumns
                const alumnos = cloneDeep(this._alumnos);

                return [200, alumnos];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Alumno - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/academia/alumno:id')
            .reply(({request}) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the alumns
                const alumnos = cloneDeep(this._alumnos);

                // Find the alumn
                const alumno = alumnos.find(item => item.id === id);

                // Return the response
                return [200, alumno];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Alumno - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/academia/alumno')
            .reply(({request}) => {

                // Get the id
                const id = request.params.get('id');

                // Find the alumn and delete it
                this._alumnos.forEach((item, index) => {

                    if ( item.id === id )
                    {
                        this._alumnos.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Alumno - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/academia/alumno')
            .reply(({request}) => {

                // Get the id and contact
                const id = request.body.id;
                const contact = cloneDeep(request.body.alumno);

                // Prepare the updated contact
                let updatedAlumno = null;

                // Find the contact and update it
                this._alumnos.forEach((item, index, alumnos) => {

                    if ( item.id === id )
                    {
                        // Update the contact
                        alumnos[index] = assign({}, alumnos[index], contact);

                        // Store the updated contact
                        updatedAlumno = alumnos[index];
                    }
                });

                // Return the response
                return [200, updatedAlumno];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Alumnos - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/academia/alumno')
            .reply(({request}) => {

                // Get the alumn
                const newAlumno = cloneDeep(request.body.alumno);

                // Generate a new GUID
                newAlumno.id = FuseMockApiUtils.guid();

                // Unshift the new alumn
                this._alumnos.unshift(newAlumno);

                // Return the response
                return [200, newAlumno];
            });


    }
}
