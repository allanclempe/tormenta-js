import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpCrmApi } from '../shared';

@Injectable()
export class CrmService {

    constructor(private http: HttpCrmApi) { }

    /**
     * Login to crm system.
     *
     * @param publicKey
     * @returns {Observable<Response>}
     */
    public login(publicKey: string): Observable<any> {
        return this.http.post('api/identity/environment/login', { public_key: publicKey })
            .map((response) => response.json());
    }

    /**
     * Get all schemas
     *
     * @returns {Observable<Response>}
     */
    public schemas(): Observable<any> {
        return this.http.get('api/cms/schema')
            .map((response) => response.json());
    }

    /**
     * Get schema by is
     *
     * @param id
     * @returns {Observable<Response>}
     */
    public schema(id: string): Observable<any> {
        return this.http.get(`api/cms/schema/${id}`).map((response) => response.json());
    }

    /**
     * Update schema
     *
     * @param id
     * @returns {Observable<Response>}
     */
    public saveSchema(name: string, model: any): Observable<any> {

        if (typeof model.definition === 'string') {
            model.definition = JSON.parse(model.definition);
        }

        return this.http.post(`api/cms/schema/${name}`, model)
            .map((response) => response.json());
    }

}
