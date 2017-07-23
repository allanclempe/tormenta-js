import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../';

@Component({
    selector: 'identity-dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

    public projects: any[];

    constructor(private identityService: IdentityService) {
        this.identityService.projects().subscribe((projects) => {
            this.projects = projects;
        });
    }

    ngOnInit() { }
}
