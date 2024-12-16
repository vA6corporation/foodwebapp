import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { buildExcel } from '../../buildExcel';
import { BusinessModel } from '../../businesses/business.model';
import { FoodsService } from '../../foods/foods.service';
import { MatButtonModule } from '@angular/material/button';
import { BusinessesService } from '../../businesses/businesses.service';
import { Subscription } from 'rxjs';
import { ToolbarService } from '../../toolbar/toolbar.service';

@Component({
    selector: 'app-reports',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatListModule,
        MatButtonModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.sass'
})
export class ReportsComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly foodsService: FoodsService,
        private readonly toolbarService: ToolbarService,
        private readonly businessesService: BusinessesService,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        business: [null, Validators.required]
    })
    businesses: BusinessModel[] = []
    isLoading: boolean = false

    private handleBusineses$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleBusineses$.unsubscribe()
    }

    ngOnInit() {
        this.toolbarService.setTitle('Reportes')
        this.handleBusineses$ = this.businessesService.handleBusinesses().subscribe(businesses => {
            this.businesses = businesses
        })
    }

    getDates(startDate: string, endDate: string) {
        const sd = new Date(startDate)
        const ed = new Date(endDate)
        var dateArray = new Array()
        var currentDate = sd
        while (currentDate <= ed) {
            dateArray.push(new Date(currentDate))
            currentDate.setDate(currentDate.getDate() + 1)
        }
        return dateArray
    }

    async onSubmit() {
        if (this.formGroup.valid) {
            const { startDate, endDate, business } = this.formGroup.value
            const dates = this.getDates(startDate, endDate)
            this.foodsService.getFoodsByBusinessRangeDate(business.id, startDate.toDateString(), endDate.toDateString()).subscribe(foods => {
                const body = []
                let startMerges = 0
                const merges = []
                const wscols = [50]
                dates.forEach(item => {
                    const merge: any = {}
                    merge.s = { r: 0, c: startMerges + 2 }
                    merge.e = { r: 0, c: startMerges + 4 }
                    startMerges += 3
                    merges.push(merge)
                })
                merges.push({
                    s: { r: 0, c: 0 },
                    e: { r: 1, c: 0 },
                })
                const rowDatesHead = ['APELLIDOS Y NOMBRES', 'DNI']
                dates.forEach(item => {
                    rowDatesHead.push(...[item.toISOString().split('T')[0], '', ''])
                })
                body.push(rowDatesHead)
                const rowFoodsHead = ['', '']
                dates.forEach(item => {
                    rowFoodsHead.push(...['D', 'A', 'C'])
                })
                body.push(rowFoodsHead)

                let totalDesayuno = 0
                let totalAlmuerzo = 0
                let totalCena = 0

                for (const customerKey in foods) {
                    let customer = foods[customerKey]
                    let customerRow = [customer.name, customer.dni]

                    for (const date of dates) {
                        let element = null

                        for (const foodsKey in customer.groupFoods) {
                            const dateString = date.toISOString().split('T')[0]
                            if (customer.groupFoods.hasOwnProperty(foodsKey)) {
                                if (dateString == foodsKey) {
                                    element = customer.groupFoods[foodsKey]
                                    continue
                                }
                            }
                        }

                        if (element) {
                            if (element.find((e: any) => e.turn.food == 'DESAYUNO')) totalDesayuno++
                            if (element.find((e: any) => e.turn.food == 'ALMUERZO')) totalAlmuerzo++
                            if (element.find((e: any) => e.turn.food == 'CENA')) totalCena++
                            customerRow.push(...[
                                element.find((e: any) => e.turn.food == 'DESAYUNO') ? 1 : 0,
                                element.find((e: any) => e.turn.food == 'ALMUERZO') ? 1 : 0,
                                element.find((e: any) => e.turn.food == 'CENA') ? 1 : 0,
                            ])
                        } else {
                            customerRow.push(...[
                                0,
                                0,
                                0,
                            ])
                        }
                    }

                    body.push(customerRow)
                }

                body.push([''])
                body.push(['TOTAL DESAYUNOS', totalDesayuno])
                body.push(['TOTAL ALMUERZOS', totalAlmuerzo])
                body.push(['TOTAL CENAS', totalCena])

                const name = `REPORTE ${business.businessName} DESDE ${formatDate(startDate, 'dd/MM/yyyy', 'en-US')} AL ${formatDate(endDate, 'dd/MM/yyyy', 'en-US')}`
                buildExcel(body, name, wscols, [], merges)
            })
        }
    }

}
