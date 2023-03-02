import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { FoodStuffModule } from './food/food-stuff.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env']
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DB_HOST'),
        dbName: configService.get('DB_NAME'),
        user: configService.get('DB_USER'),
        pass: configService.get('DB_PASS'),
      }),
      inject: [ConfigService],
    }),
    FoodStuffModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join('schema.gql'),
      sortSchema: true,
    }),
  ],
})
export class AppModule {}
