import { Component } from '@angular/core';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { BusinessesService } from '../../businesses/businesses.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BusinessModel } from '../../businesses/business.model';
import { CommonModule } from '@angular/common';
import { CustomersService } from '../customers.service';

@Component({
    selector: 'app-create-customers',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule
    ],
    templateUrl: './create-customers.component.html',
    styleUrl: './create-customers.component.sass'
})
export class CreateCustomersComponent {

    constructor(
        private readonly toolbarService: ToolbarService,
        private readonly businessesService: BusinessesService,
        private readonly customersService: CustomersService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        dni: ['', Validators.required],
        name: ['', Validators.required],
        business_id: ['', Validators.required],
    })
    businesses: BusinessModel[] = []
    isLoading: boolean = false

    ngOnInit() {
        this.toolbarService.setTitle('Nueva cliente')
        this.businessesService.handleBusinesses().subscribe(businesses => {
            this.businesses = businesses
        })
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.toolbarService.loadingBarStart()
            this.isLoading = true
            this.customersService.create(this.formGroup.value).subscribe({
                next: () => {
                    this.router.navigate(['/customers'])
                    this.toolbarService.showMessage('Registrado correctamente')
                    this.isLoading = false
                    this.toolbarService.loadingBarFinish()
                }, error: (error: HttpErrorResponse) => {
                    console.log(error);
                    this.isLoading = false
                    this.toolbarService.loadingBarFinish()
                    this.toolbarService.showMessage(error.error)
                }
            })
        }
    }

}
