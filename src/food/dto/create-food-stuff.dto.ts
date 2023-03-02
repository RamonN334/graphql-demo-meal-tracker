import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { FoodStuffType } from '../models/food-stuff.model';

@InputType()
export class CreateFoodStuffDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;

    @Field()
    @IsEnum(FoodStuffType)
    @IsNotEmpty()
    type: FoodStuffType;

    @Field()
    @IsNumber({ maxDecimalPlaces: 2 })
    proteins: number;

    @Field()
    @IsNumber({ maxDecimalPlaces: 2 })
    fats: number;

    @Field()
    @IsNumber({ maxDecimalPlaces: 2 })
    carbohydrates: number;
}