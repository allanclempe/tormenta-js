import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IdentityService } from '../../identity.service';
import { CrmService } from '../../../cms';
import { AppStore } from '../../../app.store';

@Component({
    selector: 'environment-detail',
    templateUrl: 'environment-detail.component.html'
})
export class EnvironmentDetailComponent implements OnInit {

    public environment: any;
    private id: string;

    constructor(
        private identityService: IdentityService,
        private crmService: CrmService,
        private route: ActivatedRoute,
        private store: AppStore,
        private router: Router) {
        this.route.params.subscribe((params) => {
            this.id = params.id;
            this.identityService.environment(this.id).subscribe((env) => {
                this.environment = env;
            });
        });
    }

    public gotoCrm(publicKey: string) {
        this.crmService.login(publicKey).subscribe((response) => {
            this.store.set('cms_token', response.token);
            this.router.navigate(['/cms/dashboard']);
        });
    }

    ngOnInit() { }
}