import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { EmailModule } from './email/email.module';
import { EmailLogsController } from './email-logs/email-logs.controller';
import { EmailLogsModule } from './email-logs/email-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: `${config.get('MONGO_URI')}/${config.get('DB_NAME')}?retryWrites=true&w=majority`,
        connectionFactory: (connection: Connection) => {
          const logger = new Logger('MongoDB');

          connection.on('connected', () => logger.log('MongoDB connected'));
          connection.on('open', () => logger.log('MongoDB open'));
          connection.on('disconnected', () =>
            logger.log('MongoDB disconnected'),
          );
          connection.on('reconnected', () => logger.log('MongoDB reconnected'));
          connection.on('disconnecting', () =>
            logger.log('MongoDB disconnecting'),
          );

          return connection;
        },
      }),
    }),

    EmailModule,

    EmailLogsModule,
  ],

  controllers: [AppController, EmailLogsController],
  providers: [AppService],
})
export class AppModule { }
