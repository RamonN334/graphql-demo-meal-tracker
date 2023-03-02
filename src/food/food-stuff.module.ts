import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { FoodStuffResolver } from './food-stuff.resolver';
import { FoodStuffModel, FoodStuffSchema } from './models/food-stuff.model';
import { FoodStuffService } from './services/food-stuff.service';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: FoodStuffModel.name, schema: FoodStuffSchema }])
    ],
    providers: [FoodStuffService, FoodStuffResolver],
    exports: [FoodStuffService]
  })
  export class FoodStuffModule {}