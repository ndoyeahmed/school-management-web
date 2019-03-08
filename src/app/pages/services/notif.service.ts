import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class NotificationService {
  constructor(private toastrService: ToastrService) {
  }

  public success(message: string, title?: string, config?: any): void {
    this.toastrService.success(message, title, config);
  }

  public error(message: string, title?: string, config?: any): void {
    this.toastrService.error(message, title, config);
  }

  public info(message: string, title?: string, config?: any): void {
    this.toastrService.info(message, title, config);
  }

  public warning(message: string, title?: string, config?: any): void {
    this.toastrService.warning(message, title, config);
  }
}
