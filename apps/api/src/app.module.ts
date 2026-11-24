import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { AuthenticationModule, google } from '@nestjs/authentication';
import {
  FileTemplateEngine,
  LogMailTransport,
  MailModule,
  SmtpTransport,
} from '@nestjs/mail';
import { join } from 'node:path';
import { ProfilesModule } from './profiles/profiles.module.js';
import { PetsModule } from './pets/pets.module.js';
import { PostsModule } from './posts/posts.module.js';
import { TitlesModule } from './titles/titles.module.js';
import { AppointmentsModule } from './appointments/appointments.module.js';
import { MedicalhistoryModule } from './medicalhistory/medicalhistory.module.js';
import { BusinessModule } from './business/business.module.js';
import { EventsModule } from './events/events.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'api',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailModule.forRootAsync({
      useFactory: () => ({
        // Your provider in production. In development, each email (links
        // included) is printed to the log.
        transport: process.env.SMTP_URL
          ? new SmtpTransport({ url: process.env.SMTP_URL })
          : new LogMailTransport(),
        // The emails' HTML: the templates in mail/templates, next to this file
        templates: new FileTemplateEngine({
          dir: join(import.meta.dirname, 'mail/templates'),
        }),
        from: 'Accounts <accounts@example.com>',
      }),
    }),
    AuthenticationModule.forRootAsync({
      useFactory: () => ({
        emailVerification: {
          url: `${process.env.APP_URL}/verify-email`,
        },
        passwordReset: {
          url: `${process.env.APP_URL}/password-reset`,
        },

        oidc: {
          // The callback route of OidcController, registered with Google.
          callbackUrl: `${process.env.API_URL}/auth/oidc/:provider/callback`,
          providers: {
            google: google({
              clientId: process.env.GOOGLE_CLIENT_ID!,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            }),
          },
        },
      }),
    }),

    UsersModule,
    AuthModule,
    ProfilesModule,
    PetsModule,
    PostsModule,
    TitlesModule,
    AppointmentsModule,
    MedicalhistoryModule,
    BusinessModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
