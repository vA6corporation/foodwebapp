import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    getCustomerById(customerId: string) {
        return this.httpService.get(`customers/${customerId}`)
    }

    getCustomerByDni(customerId: string) {
        return this.httpService.get(`customers/byDni/${customerId}`)
    }

    getCustomersByKey(key: string) {
        return this.httpService.get(`customers/byKey/${key}`)
    }

    getCustomersByPage(
        params: Params,
    ) {
        return this.httpService.get('customers', params)
    }

    create(customer: any) {
        return this.httpService.post('customers', { customer })
    }

    createMassive(customers: any[]) {
        return this.httpService.post('customers/massive', { customers })
    }

    update(customer: any, customerId: string) {
        return this.httpService.put(`customers/${customerId}`, { customer })
    }

    delete(customerId: string) {
        return this.httpService.delete(`customers/${customerId}`)
    }
    
}
