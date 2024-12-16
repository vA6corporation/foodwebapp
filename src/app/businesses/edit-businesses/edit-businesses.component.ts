import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { BusinessesService } from '../businesses.service';

@Component({
    selector: 'app-edit-businesses',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    templateUrl: './edit-businesses.component.html',
    styleUrl: './edit-businesses.component.sass'
})
export class EditBusinessesComponent {

    constructor(
        private readonly toolbarService: ToolbarService,
        private readonly businessesService: BusinessesService,
        private readonly formBuilder: FormBuilder,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        ruc: ['', Validators.required],
        businessName: ['', Validators.required]
    })
    isLoading: boolean = false
    businessId: string = ''

    ngOnInit() {
        this.toolbarService.setTitle('Editar empresa')
        this.businessId = this.activatedRoute.snapshot.params['businessId']
        this.businessesService.getBusinessById(this.businessId).subscribe(business => {
            this.formGroup.patchValue(business)
        })
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.toolbarService.loadingBarStart()
            this.isLoading = true
            this.businessesService.update(this.formGroup.value, this.businessId).subscribe({
                next: () => {
                    this.isLoading = false
                    this.toolbarService.loadingBarFinish()
                    this.router.navigate(['/businesses'])
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
