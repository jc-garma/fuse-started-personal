import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import {courses as coursesData} from 'app/mock-api/apps/academia/data';

@Injectable({
    providedIn: 'root'
})
export class AcademiaMockApi
{
    private _courses: any[] = coursesData;

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
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Courses - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/academia/curso')
            .reply(() => {

                // Clone the courses
                const courses = cloneDeep(this._courses);

                return [200, courses];
            });
    }
}
