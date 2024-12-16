import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { BusinessModel } from './business.model';

@Injectable({
    providedIn: 'root'
})
export class BusinessesService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    private businesses$: BehaviorSubject<BusinessModel[]> | null = null

    handleBusinesses(): Observable<BusinessModel[]> {
        if (this.businesses$ === null) {
            this.businesses$ = new BehaviorSubject<BusinessModel[]>([])
            this.loadBusinesses()  
        }
        return this.businesses$.asObservable()
    }

    loadBusinesses() {
        this.httpService.get('businesses/all').subscribe(businesses => {
            if (this.businesses$) {
                this.businesses$.next(businesses) 
            }
        })
    }

    getBusinessById(businessId: string) {
        return this.httpService.get(`businesses/${businessId}`)
    }

    getBusinessesByPage(
        params: Params,
    ) {
        return this.httpService.get('businesses', params)
    }

    getOpenBusiness() {
        return this.httpService.get('')
    }

    create(business: any) {
        return this.httpService.post('businesses', { business })
    }

    update(business: any, businessId: string) {
        return this.httpService.put(`businesses/${businessId}`, { business })
    }

    delete(businessId: string) {
        return this.httpService.delete(`businesses/${businessId}`)
    }

}
