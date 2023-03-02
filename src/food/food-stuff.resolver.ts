import { ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFoodStuffDto } from './dto/create-food-stuff.dto';
import { FoodStuffModel } from './models/food-stuff.model';
import { FoodStuffService } from './services/food-stuff.service';

@Resolver(of => FoodStuffModel)
export class FoodStuffResolver {
    constructor(
        private readonly foodStuffService: FoodStuffService,
    ) {}

    @Mutation(returns => FoodStuffModel)
    async createFoodStuff(
        @Args(
            'createFoodStuffDto',
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true }
            )
        ) createFoodStuffDto: CreateFoodStuffDto,
    ): Promise<FoodStuffModel> {
        return this.foodStuffService.create(createFoodStuffDto);
    }

    @Query(returns => FoodStuffModel)
    async foodStuff(
        @Args('id') id: string
    ): Promise<FoodStuffModel> {
        return this.foodStuffService.findOne(id);
    }

    @Query(returns => [FoodStuffModel])
    async foodStuffs(
        @Args('skip', { defaultValue: 0 }) skip: number,
        @Args('take', { defaultValue: 100 }) take: number,
    ): Promise<FoodStuffModel[]> {
        return this.foodStuffService.findAll(skip, take);
    }
}