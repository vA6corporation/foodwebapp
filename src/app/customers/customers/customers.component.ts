import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Params, RouterModule } from '@angular/router';
import { BusinessModel } from '../../businesses/business.model';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { CustomersService } from '../customers.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-customers',
    standalone: true,
    imports: [
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatPaginatorModule,
        RouterModule,
        CommonModule,
    ],
    templateUrl: './customers.component.html',
    styleUrl: './customers.component.sass'
})
export class CustomersComponent {

    constructor(
        private readonly toolbarService: ToolbarService,
        private readonly customersService: CustomersService,
    ) { }

    displayedColumns: string[] = ['dni', 'name', 'businessName', 'actions']
    dataSource: BusinessModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10]
    pageIndex: number = 0
    params: Params = { page: 1 }

    private handleSearch$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
    }

    ngOnInit() {
        this.toolbarService.setTitle('Clientes')
        this.toolbarService.setMenu([
            { id: 'search', label: 'Buscar', icon: 'search', show: true },
            // { id: 'excel_simple', label: 'Exportar Excel', icon: 'file_download', show: false },
        ])

        this.handleSearch$ = this.toolbarService.handleSearch().subscribe(key => {
            this.toolbarService.loadingBarStart()
            this.customersService.getCustomersByKey(key).subscribe({
                next: customers => {
                    this.toolbarService.loadingBarFinish()
                    this.dataSource = customers
                }, error: (error: HttpErrorResponse) => {
                    console.log(error)
                    this.toolbarService.loadingBarFinish()
                    this.toolbarService.showMessage(error.error)
                }
            })
        })

        this.fetchData()
    }

    onDelete(businessId: string) {
        const ok = confirm('Estas seguro de eliminar?...')
        if (ok) {
            this.toolbarService.loadingBarStart()
            this.customersService.delete(businessId).subscribe(() => {
                this.toolbarService.loadingBarFinish()
                this.fetchData()
            })
        }
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        Object.assign(this.params, { page: this.pageIndex + 1 })
        this.fetchData()
    }

    fetchData() {
        this.toolbarService.loadingBarStart()
        this.customersService.getCustomersByPage(this.params).subscribe(res => {
            console.log(res);
            this.toolbarService.loadingBarFinish()
            this.dataSource = res.data
            this.length = res.total
        })
    }

}
