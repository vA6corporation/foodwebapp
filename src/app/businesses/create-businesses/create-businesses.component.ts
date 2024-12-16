import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { BusinessesService } from '../businesses.service';

@Component({
    selector: 'app-create-businesses',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    templateUrl: './create-businesses.component.html',
    styleUrl: './create-businesses.component.sass'
})
export class CreateBusinessesComponent {

    constructor(
        private readonly toolbarService: ToolbarService,
        private readonly businessesService: BusinessesService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        ruc: ['', Validators.required],
        businessName: ['', Validators.required]
    })
    isLoading: boolean = false

    ngOnInit() {
        this.toolbarService.setTitle('Nueva empresa')
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.toolbarService.loadingBarStart()
            this.isLoading = true
            this.businessesService.create(this.formGroup.value).subscribe({
                next: () => {
                    this.router.navigate(['/businesses'])
                    this.toolbarService.showMessage('Registrado correctamente')
                    this.isLoading = false
                    this.toolbarService.loadingBarFinish()
                    this.businessesService.loadBusinesses()
                }, error: (error: HttpErrorResponse) => {
                    this.isLoading = false
                    this.toolbarService.loadingBarFinish()
                    this.toolbarService.showMessage(error.error)
                }
            })
        }
    }

}
