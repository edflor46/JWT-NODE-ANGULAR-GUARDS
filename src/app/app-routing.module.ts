import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidatTokenGuard } from './guard/validat-token.guard';

const routes: Routes = [
  {
    path:'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path:'', 
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule), 
    canActivate: [ValidatTokenGuard],
    canLoad: [ValidatTokenGuard]
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
