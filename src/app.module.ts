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
        connectionFactory: async (connection: Connection) => {
          const logger = new Logger('MongoDB');
          await connection
            .asPromise()
            .then((conn) => {
              logger.log(`MongoDB connected :: ${conn.host}`);
            })
            .catch((err) => {
              logger.log(`MongoDB connection Failed :: ${err}`);
            });
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
