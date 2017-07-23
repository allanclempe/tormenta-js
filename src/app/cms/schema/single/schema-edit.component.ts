import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrmService } from '../../';


@Component({
    selector: 'schema-edit',
    templateUrl: 'schema-edit.component.html'
})

export class SchemaEditComponent implements OnInit {

    public form: FormGroup;
    private id: string;

    constructor(
        private crmService: CrmService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router) {

        this.form = this.fb.group({
            name: ['', [Validators.required]],
            definition: ['', [Validators.required]]
        });

        this.route.params.subscribe((params) => {
            this.id = params.id;
            if (!this.id) {
                return;
            }

            this.crmService.schema(this.id).subscribe((schema) => {
                this.form.setValue({
                    name: schema.name,
                    definition: JSON.stringify(schema.definition, null, 4)
                });
            });
        });
    }

    public save(model: any, valid: boolean) {
        if (!valid) {
            return;
        }

        this.crmService.saveSchema(model.name, model).subscribe((response) => {
            this.router.navigate(['/cms/dashboard']);
        });
    }

    ngOnInit() { }


}