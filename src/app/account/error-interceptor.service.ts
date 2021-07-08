import { UtilsService } from './../services/utils.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from './account.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from '../services/storage.service';

export interface FieldMessage {
  fieldName: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {


  constructor(
    private accountService: AccountService,
    public storage: StorageService,
    private router: Router,
    private utilServiece: UtilsService,
    private spinner: NgxSpinnerService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return (next.handle(req)
      .pipe(catchError(error => {
        let errorMessage;
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.status}`;
        console.log(errorMessage);

        //  //console.log((error.state));
        //  //console.log("error" + error.message + 'Erro  : ' +   this.listErrors(error.error));

        /*if (error.statusText == "Unknown Error") {
          let errorMessage="Unknown Error";

           this.spinner.hide();
          this.utilServiece.createNotification('error', 'Alerta',
          "Servidor temporariamente indisponivel  "  );
          //console.log(error);

        }
        */
        //console.log(`Código do erro: ${error.error}, ` + `menssagem: ${error.status}`);

        let errorObj = error;
        /*  if (errorObj.error) {
              errorObj = errorObj.error;
          }

         if (!errorObj.status) {
              errorObj = JSON.parse(errorObj);
          }
  */

        ////console.log(error.status);

        // this.toastr.error('Digite seu email e senha', '');
        switch (errorObj.status) {
          case 0:
          //  this.utilServiece.createNotification('error', 'Aviso', 'Servidor indisponível tente novamente mais tarde')
            break;
          case 401:
            this.handle401();
            break;

          case 403:
            this.handle403(errorObj);
            break;

          case 422:
            this.handle422(errorObj);
            break;

          case 423:
            this.utilServiece.createNotification('error', 'Alerta', "Erro: " + errorObj.status + ' - ' + (errorObj.error));
            break;
          case 302:
            this.handle302(errorObj)
            break;
          case 500:

            this.handle500(errorObj);
            //this.accountService.logout();
            break;
          default:
            this.handleDefaultEror(errorObj);
        }

        return Observable.throw(errorObj);
      }
      )
      )
    ) as any;
  }

  handle302(errorObj: any) {
    let errorMessage;
    errorMessage = `Código do erro: ${errorObj.status}, ` + `menssagem: ${errorObj.error}`;
    this.utilServiece.createNotification('error', 'Alerta', `${errorObj.error}`)
    //console.log(errorMessage);
    this.spinner.hide();

    // this.storage.setLocalUser(null);
    //////console.log("error" + errorObj.message + 'Erro ' + errorObj.status + ': ' + errorObj.error);
    //this.toastr.error(errorObj.message,  errorObj.status + ': ' + errorObj.error);
  }
  handle500(errorObj) {
    let errorMessage;

    errorMessage = `Código do erro: ${errorObj.status}, ` + `menssagem: ${errorObj.erro}`;
    this.utilServiece.createNotification('error', 'Alerta',
      "Servidor temporariamente indisponivel, informe ao administrador erro: "
      + errorObj.status + ' - ' + JSON.parse(errorObj.error).error);
    this.spinner.hide();

    //this.utilService.createNotification('error', 'Alerta', `${errorObj.message}`)
    // this.storage.setLocalUser(null);

    //this.toastr.error(errorObj.message,  errorObj.status + ': ' + errorObj.error);
  }
  handle403(errorObj) {
    // this.storage.setLocalUser(null);
    //////console.log(errorObj.message);
    //:////console.log("error" + errorObj.message + 'Erro ' + errorObj.status + ': ' + errorObj.error);
    // this.toastr.error(errorObj.message,  errorObj.status + ': ' + errorObj.error);

    this.router.navigate(['acessonegado']);

  }

  handle401() {

    // this.toastr.error('Email ou senha incorretos', 'Erro 401: falha de autenticação');

    /* let alert = this.alertCtrl.create({
       title: 'Erro 401: falha de autenticação',
       message: 'Email ou senha incorretos',
       enableBackdropDismiss: false,
       buttons: [
         {
           text: 'Ok'
         }
       ]
     });
     alert.present();*/
  }

  handle422(errorObj) {
    let s: string = '';
    for (var i = 0; i < errorObj.errors.length; i++) {
      s = s + '<p><strong>' + errorObj.errors[i].fieldName + "</strong>: " + errorObj.errors[i].message + '</p>';
    }

    // this.toastr.error(s, 'Erro 422: Validação');
    /*let alert = this.alertCtrl.create({
      title: 'Erro 422: Validação',
      message: this.listErrors(errorObj.errors),
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();*/
  }

  handleDefaultEror(errorObj) {
    try {
      this.utilServiece.createNotification('error', 'Alerta', (errorObj.error))
    } catch {
      /* this.utilServiece.createNotification('error', 'Alerta',
       "Servidor temporariamente indisponivel, informe ao administrador erro: "
       + errorObj.status + ' - ' + JSON.parse(errorObj.error).error);
       */
    }
    console.log(errorObj);


    this.spinner.hide();
    // this.toastr.error(errorObj.message, 'Erro ' + errorObj.status + ': ' + errorObj.error);
    /*let alert = this.alertCtrl.create({
      title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();*/
  }

  private listErrors(messages: FieldMessage[]): string {
    let s: string = '';
    for (var i = 0; i < messages.length; i++) {
      //   //console.log( messages[i].fieldName );

      s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
    }
    return s;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
