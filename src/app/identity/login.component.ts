import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from './identity.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStore } from '../app.store';

@Component({
    selector: 'identity-login',
    templateUrl: 'login.component.html'
})

export class IdentityLoginComponent implements OnInit {

    public form: FormGroup;

    constructor(private identityService: IdentityService,
                private fb: FormBuilder,
                private store: AppStore,
                private router: Router) {

        this.form = this.fb.group({
            email: ['demo@node-crm.com', [Validators.required, Validators.email]],
            password: ['demo_password', Validators.required]
        });
    }

    ngOnInit() { }

    public login(model: any) {
        this.identityService.login(model.email, model.password).subscribe((response) => {
            this.store.set('ide_token', response.token);
            this.router.navigate(['identity/dashboard']);
        });
    }
}
