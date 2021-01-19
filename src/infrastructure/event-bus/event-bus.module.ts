import { Module } from '@nestjs/common';
import { EventBusAdapterService } from './event-bus.service';
// import {BusModule} from '@qlean/service-bus-sdk'

// const {
//   SERVICE_BUS_URL,
//   SSO_M2M_URL,
//   SSO_M2M_CLIENT_SECRET,
//   SSO_M2M_IS_SECURE,
//   SSO_M2M_CLIENT_ID,
//   SSO_M2M_SERVICE_BUS_CLIENT,
//   SERVICE_BUS_IS_SECURE
// } = process.env;

// const SSO_M2M_PERMISSIONS = [
//   'service-bus:subscribe',
//   'service-bus:emit',
//   'service-bus:handle',
// ];

@Module({
  imports: [
    // BusModule.forRoot({
    //   isSecure: SERVICE_BUS_IS_SECURE === 'true',
    //   url: SERVICE_BUS_URL,
    //   auth: {
    //     url: SSO_M2M_URL,
    //     isSecure: SSO_M2M_IS_SECURE === 'true',
    //     clientId: SSO_M2M_SERVICE_BUS_CLIENT,
    //     clientSecret: SSO_M2M_CLIENT_SECRET,
    //     permissions: SSO_M2M_PERMISSIONS,
    //   },
    // }),
  ],
  exports: [
    EventBusAdapterService,
  ],
  providers: [
    EventBusAdapterService,
  ],
})
export class EventBusModule { }
