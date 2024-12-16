import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { CustomersService } from '../customers.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { BusinessModel } from '../../businesses/business.model';
import { BusinessesService } from '../../businesses/businesses.service';

@Component({
    selector: 'app-edit-customers',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    templateUrl: './edit-customers.component.html',
    styleUrl: './edit-customers.component.sass'
})
export class EditCustomersComponent {

    constructor(
        private readonly toolbarService: ToolbarService,
        private readonly businessesService: BusinessesService,
        private readonly customersService: CustomersService,
        private readonly formBuilder: FormBuilder,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        dni: ['', Validators.required],
        name: ['', Validators.required],
        business_id: ['', Validators.required],
    })
    businesses: BusinessModel[] = []
    isLoading: boolean = false
    customerId: string = ''

    ngOnInit() {
        this.toolbarService.setTitle('Editar cliente')
        this.customerId = this.activatedRoute.snapshot.params['customerId']
        this.customersService.getCustomerById(this.customerId).subscribe(customer => {
            this.formGroup.patchValue(customer)
        })
        this.businessesService.handleBusinesses().subscribe(businesses => {
            this.businesses = businesses
        })
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.toolbarService.loadingBarStart()
            this.isLoading = true
            this.customersService.update(this.formGroup.value, this.customerId).subscribe({
                next: () => {
                    this.isLoading = false
                    this.toolbarService.loadingBarFinish()
                    this.router.navigate(['/customers'])
                    this.toolbarService.showMessage('Se han guardado los cambios')
                }, error: (error: HttpErrorResponse) => {
                    this.isLoading = false
                    this.toolbarService.loadingBarFinish()
                    this.toolbarService.showMessage(error.error)
                }
            })
        }
    }

}
