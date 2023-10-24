import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { ValidarTokenGuard } from './auth/guards/validar-token.guard';

export const Approutes: Routes = [
  {
    path: 'auth',
    runGuardsAndResolvers: 'always',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/ecommerce', pathMatch: 'full' },
      {
        path: 'ecommerce',
        loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/ecommerce'
  }
];
