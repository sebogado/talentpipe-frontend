import { Route, Routes } from '@angular/router';

import { RegisterComponent } from './register.component';
import { CompanyRegisterComponent } from 'app/account/register/company/company.register.component';
import { RecruiterRegisterComponent } from 'app/account/register/recruiter/recruiter.register.component';

export const registerRoute: Route = {
    path: 'register',
    component: RegisterComponent,
    data: {
        authorities: [],
        pageTitle: 'register.title'
    }
};

export const companyRegisterRoute: Route = {
    path: 'register/company',
    component: CompanyRegisterComponent,
    data: {
        authorities: [],
        pageTitle: 'register.title'
    }
};
export const recruiterRegisterRoute: Route = {
    path: 'register/recruiter',
    component: RecruiterRegisterComponent,
    data: {
        authorities: [],
        pageTitle: 'register.title'
    }
};
