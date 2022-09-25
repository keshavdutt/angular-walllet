import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login';
import { DashboardComponent } from './dashboard/dashboard.component'


const routes: Routes = [
    { 
        path: '', component: LoginComponent 
    },
    {
        path: 'dashboard', component: DashboardComponent
    }
];

export const AppRoutingModule = RouterModule.forRoot(routes);