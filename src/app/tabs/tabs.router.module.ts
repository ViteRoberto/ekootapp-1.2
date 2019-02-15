import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'acs',
        children: [
          {
            path: '',
            loadChildren: '../acs/acs.module#AcsPageModule'
          }
        ]
      },
      {
        path: 'empresas',
        children: [
          {
            path: '',
            loadChildren: '../empresas/empresas.module#EmpresasPageModule'
          }
        ]
      },
      {
        path: 'tutorial/:id',
        children: [
          {
            path: '',
            loadChildren: '../tutorial/tutorial.module#TutorialPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
