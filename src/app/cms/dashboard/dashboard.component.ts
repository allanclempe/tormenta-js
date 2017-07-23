import { Component, OnInit } from '@angular/core';
import { CrmService } from '../cms.service';

@Component({
    selector: 'crm-dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    public schemas: any[];

    constructor(private crmService: CrmService) {
        this.schemas = [];
        this.crmService.schemas().subscribe((schemas) => {
            this.schemas = schemas;
        });
    }

    ngOnInit() { }
}