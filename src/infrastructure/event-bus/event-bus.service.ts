import { Injectable, OnModuleInit } from '@nestjs/common';
import {BusService} from '@qlean/service-bus-sdk';
import { Logger } from '@qlean/nestjs-logger';
// const BUS_EVENTS_QUEUE_NAME = !!process.env.BUS_EVENTS_QUEUE_NAME ? process.env.BUS_EVENTS_QUEUE_NAME : 'ycSyncListener';

/**
 * @name EventsAdapterService
 * Сервис реализующий адаптер подключения к шине событий
 */
@Injectable()
export class EventBusAdapterService implements OnModuleInit{

  private readonly logger = new Logger(EventBusAdapterService.name);

  constructor(
    // private readonly busService: BusService
    ) { }

  async onModuleInit() {
    // await this.busService.subscribe({
    //   events: [ EVENT_NAME.RECORD_SYNC_COMPLETE ],
    //   name: 'kosmos',
    // }); 
    // const handler = this.busService.createHandler('kosmos');

    // handler.on(EVENT_NAME.RECORD_SYNC_COMPLETE, data => {
    //     console.log('handler', data);
    // });
  }

  async publishContractorFrozen() {
    this.logger.info('Publish contractor frozen event');
        // try {
    //   const {messageId} = await this.busService.emit('kosmos:record-sync:initial', {initialDate: '2021-01-08T00:00:00.000Z'});
    //   this.logger.info('RECORD_SYNC_COMPLETE event sent', {messageId});
    // } catch (err) {
    //   this.logger.error('can\'t send record-sync-complete event', err);
    // }
  }

  async publishContractorBlocked() {
    this.logger.info('Publish contractor blocked event');
  }

  async publishContractBlocked() {
    this.logger.info('Publish contract blocked event');
  }

  async publishContractorActivate() {
    this.logger.info('Publish contractor activate event');
  }

  async publishNewContract() {
    this.logger.info('Publish new contract event');
  }
}
