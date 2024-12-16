import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Params } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TurnsService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    getTurnById(turnId: string) {
        return this.httpService.get(`turns/${turnId}`)
    }

    getTurnsByPage(
        params: Params,
    ) {
        return this.httpService.get('turns', params)        
    }

    getTurnsByDate(date: string) {
        return this.httpService.get(`turns/byDate/${date}`, )
    }

    getOpenTurn() {
        return this.httpService.get('')
    }

    create(turn: any) {
        return this.httpService.post('turns', { turn })
    }

    update(turn: any, turnId: string) {
        return this.httpService.put(`turns/${turnId}`, { turn })
    }

}
