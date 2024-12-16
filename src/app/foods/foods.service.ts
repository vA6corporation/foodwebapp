import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
    providedIn: 'root'
})
export class FoodsService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getFoodsByCustomerDate(customerId: string, date: string) {
        return this.httpService.get(`foods/byCustomerDate/${customerId}/${date}`)
    }

    getFoodsByBusinessRangeDate(businessId: string, startDate: string, endDate: string) {
        return this.httpService.get(`foods/byBusinessRangeDate/${businessId}/${startDate}/${endDate}`)
    }

    create(food: any) {
        return this.httpService.post('foods', food)
    }

    createWithTurn(food: any) {
        return this.httpService.post('foods/withTurn', food)
    }

}
