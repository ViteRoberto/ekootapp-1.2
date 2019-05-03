import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TutorialGuard } from './guards/tutorial.guard';
import { InicialGuard } from './guards/inicial.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [InicialGuard]},
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'acs', loadChildren: './acs/acs.module#AcsPageModule' },
  { path: 'empresas', loadChildren: './empresas/empresas.module#EmpresasPageModule' },
  { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialPageModule' },
  { path: 'inicial', loadChildren: './inicial/inicial.module#InicialPageModule', canActivate: [TutorialGuard]},
  { path: 'empresa', loadChildren: './empresa/empresa.module#EmpresaPageModule' },
  { path: 'empresa/:id', loadChildren: './empresa/empresa.module#EmpresaPageModule'},
  { path: 'retos', loadChildren: './retos/retos.module#RetosPageModule' },
  { path: 'retos/:id', loadChildren: './retos/retos.module#RetosPageModule' },  { path: 'retox', loadChildren: './retox/retox.module#RetoxPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
