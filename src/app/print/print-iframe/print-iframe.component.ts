import { Component, ElementRef, ViewChild } from '@angular/core';
import { PrintService } from '../print.service';

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { ticket80mm } from '../../foods/ticket80mm';
pdfMake.vfs = pdfFonts.pdfMake.vfs
let main: any

if ((window as any).versions) {
    main = (window as any).versions
}

@Component({
    selector: 'app-print-iframe',
    standalone: true,
    imports: [],
    templateUrl: './print-iframe.component.html',
    styleUrl: './print-iframe.component.sass'
})
export class PrintIframeComponent {

    constructor(
        private readonly printService: PrintService,
    ) { }

    @ViewChild('printIframe')
    private printIframe!: ElementRef<HTMLIFrameElement>

    ngOnInit() {
        this.printService.handlePrintTicket80mm().subscribe(printData => {
            const { food, customer, turn, countFood } = printData
            const docDefinition = ticket80mm(food, customer, turn, countFood) as any
            if (main) {
                new Promise(async (resolve) => {
                    pdfMake.createPdf(docDefinition).getBuffer(async file => {
                        main.print(file)
                        resolve(true)
                    })
                })
            } else {
                pdfMake.createPdf(docDefinition).print({}, this.printIframe.nativeElement.contentWindow as any)
            }
        })
    }

}
