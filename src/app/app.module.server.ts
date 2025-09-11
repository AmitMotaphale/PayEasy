import { NgModule } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { App } from './app';
import { AppModule } from './app-module';
import { serverRoutes } from './app.routes.server';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  imports: [AppModule],
  //This is SSR this is for SEO and for future uncomment only for that otherwise gaurd wont work ~K/G
  // providers: [provideServerRendering(withRoutes(serverRoutes))],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [App],
})
export class AppServerModule {}
