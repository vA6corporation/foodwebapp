import { EventEmitter, Injectable } from '@angular/core';
import { Ticket80mmModel } from './ticket-80mm.model';

@Injectable({
    providedIn: 'root'
})
export class PrintService {

    constructor() { }

    private printTicket80mm$: EventEmitter<Ticket80mmModel> = new EventEmitter()

    handlePrintTicket80mm() {
        return this.printTicket80mm$.asObservable()
    }

    printTicket80mm(printData: Ticket80mmModel) {
        this.printTicket80mm$.next(printData)
    }

}
