import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomerModel } from '../../customers/customer.model';
import { CustomersService } from '../../customers/customers.service';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { TurnsService } from '../../turns/turns.service';
import { FoodModel } from '../food.model';
import { FoodsService } from '../foods.service';
import { TurnModel } from '../../turns/turns/turn.model';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-change-tickets',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        ReactiveFormsModule
    ],
    templateUrl: './change-tickets.component.html',
    styleUrl: './change-tickets.component.sass'
})
export class ChangeTicketsComponent {

    constructor(
        private readonly customersService: CustomersService,
        private readonly toolbarService: ToolbarService,
        private readonly turnsService: TurnsService,
        // private readonly printService: PrintService,
        private readonly foodsService: FoodsService,
        // private readonly formBuilder: FormBuilder,
    ) { }

    @ViewChild('inputDni')
    inputDni!: ElementRef<HTMLInputElement>
    formGroup = new FormGroup({
        dni: new FormControl('', { nonNullable: true })
    })
    dateGroup = new FormGroup({
        turnDate: new FormControl('', { nonNullable: true })
    })
    intervalId: any = ''
    customer: CustomerModel | null = null
    foods: FoodModel[] = []
    turns: TurnModel[] = []

    ngOnDestroy() {
        clearInterval(this.intervalId)
    }

    ngOnInit() {
        this.toolbarService.setTitle('Canjear tickets')
        this.intervalId = setInterval(() => {
            this.inputDni.nativeElement.focus()
        }, 1000)
    }

    getTurn(food: string) {
        return this.turns.find(e => this.foods.find(item => item.turn_id == e.id && e.food == food))
    }

    onChangeTicket(food: string) {
        const ok = confirm('Estas seguro de canjear?...')
        if (ok) {
            const turn = this.turns.find(e => e.food === food)
            if (turn && this.customer) {
                const food = {
                    customerId: this.customer.id,
                    turnId: turn.id
                }
                this.toolbarService.loadingBarStart()
                this.foodsService.createWithTurn(food).subscribe({
                    next: food => {
                        this.onDateChange()
                        this.toolbarService.loadingBarFinish()
                    }, error: (error: HttpErrorResponse) => {
                        this.toolbarService.loadingBarFinish()
                        this.toolbarService.showMessage(error.error)
                    }
                })
            } else {
                this.toolbarService.showMessage('No existe el turno')
            }
        }
    }

    onDateChange() {
        if (this.dateGroup.valid && this.customer) {
            const { turnDate } = this.dateGroup.value
            if (turnDate) {
                const date = new Date(turnDate)
                this.foodsService.getFoodsByCustomerDate(this.customer.id, date.toDateString()).subscribe(foods => {
                    this.foods = foods
                })
                this.turnsService.getTurnsByDate(date.toDateString()).subscribe(turns => {
                    this.turns = turns
                })
            }
        }
    }

    onSubmit() {
        if (this.formGroup.valid) {
            const { dni } = this.formGroup.value
            if (dni) {
                this.toolbarService.loadingBarStart()
                this.customersService.getCustomerByDni(dni).subscribe({
                    next: customer => {
                        this.customer = customer
                        this.toolbarService.loadingBarFinish()
                    }, error: (error: HttpErrorResponse) => {
                        this.toolbarService.showMessage('El N° de DNI no existe')
                        this.toolbarService.loadingBarFinish()
                    }
                })
            }
        }
    }

}
