import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrmService } from './cms.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStore } from '../app.store';

@Component({
    selector: 'crm-login',
    templateUrl: 'login.component.html'
})

export class CrmLoginComponent implements OnInit {

    public form: FormGroup;

    constructor(
        private crmService: CrmService,
        private fb: FormBuilder,
        private store: AppStore,
        private router: Router) {

        this.form = this.fb.group({
            publicKey: ['ZhVjEN3IRpBs7kzrdcz0i4XSrUIjtDrh7kMAVdjt5qg=', [Validators.required]]
        });
    }

    public login(model: any, valid: boolean) {
        if (!valid) {
            return;
        }

        this.crmService.login(model.publicKey).subscribe((response) => {
            this.store.set('cms_token', response.token);
            this.router.navigate(['cms/dashboard']);
        });
    }

    ngOnInit() { }
}
