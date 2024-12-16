import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { BusinessModel } from '../../businesses/business.model';
import { BusinessesService } from '../../businesses/businesses.service';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { CustomersService } from '../customers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerModel } from '../customer.model';
import { parseExcel } from '../../buildExcel';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-import-customers',
    standalone: true,
    imports: [
        MatTableModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule
    ],
    templateUrl: './import-customers.component.html',
    styleUrl: './import-customers.component.sass'
})
export class ImportCustomersComponent {

    constructor(
        private readonly businessesService: BusinessesService,
        private readonly customersService: CustomersService,
        private readonly toolbarService: ToolbarService,
        private readonly formBuilder: FormBuilder,
    ) { }

    displayedColumns: string[] = ['dni', 'name', 'actions']
    dataSource: any[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0
    formGroup: FormGroup = this.formBuilder.group({
        business_id: ['', Validators.required],
    })
    businesses: BusinessModel[] = []
    customers: CustomerModel[] = []
    isLoading: boolean = false

    ngOnInit() {
        this.toolbarService.setTitle('Importar clientes')
        this.businessesService.handleBusinesses().subscribe(businesses => {
            this.businesses = businesses
        })
    }

    async onFileSelected(files: FileList | null, input: HTMLInputElement, table: MatTable<any>) {
        if (files && files[0]) {
            const customers = await parseExcel(files[0])
            input.value = ''
            this.dataSource = []
            for (let index = 0; index < customers.length; index++) {
                const customer = customers[index]
                if (customer.dni) {
                    if (String(customer.dni).length === 8) {
                        this.dataSource.push({
                            dni: String(customer.dni || ''),
                            name: customer.nombres,
                        })
                    } else {
                        alert('El Numero de DNI debe contener 8 digitos: ' + `linea: ${index + 1}`)
                        break
                    }
                } else {
                    alert('El Numero de DNI es obligatorio: ' + `linea: ${index + 1}`)
                }
            }
            table.renderRows()
        }
    }

    onDeleteCustomer(index: number, table: MatTable<any>) {
        this.dataSource.splice(index, 1)
        table.renderRows()
    }

    onSubmit() {
        if (!this.dataSource.length) {
            this.toolbarService.showMessage('Seleccione un archivo Excel')
            return
        }
        if (this.formGroup.valid) {
            this.toolbarService.loadingBarStart()
            this.isLoading = true
            const customers = this.dataSource
            const { business_id } = this.formGroup.value
            customers.forEach(e => e.business_id = business_id)
            this.customersService.createMassive(customers).subscribe({
                next: () => {
                    this.toolbarService.showMessage('Registrado correctamente')
                    this.isLoading = false
                    this.toolbarService.loadingBarFinish()
                }, error: (error: HttpErrorResponse) => {
                    this.isLoading = false
                    this.toolbarService.loadingBarFinish()
                    this.toolbarService.showMessage(error.error)
                }
            })
        }
    }

}
