import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, interval, map } from 'rxjs';

interface MessageEvent {
  data: object | string;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('event')
  sendEvent(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((num: number) => ({
        data: {
          notificationTitle: 'Dummy Notification',
          isRead: true,
          notificationDescription: 'lorem ipsum',
          id: num,
        },
      })),
    );
  }
}
