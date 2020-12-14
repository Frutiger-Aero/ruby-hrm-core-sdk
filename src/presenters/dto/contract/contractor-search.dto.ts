import { SortFieldDto } from "@qlean/nestjs-typeorm-persistence-search";
import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional, ValidateNested } from "class-validator";
import { IContract } from "../../../domain";
import { WhereFieldsDto } from "./where-fields.dto";

export class ContractSearchDto {
  @IsNumber()
  @Transform(Number)
  readonly page: number;
  
  @IsOptional()
  @IsNumber()
  @Transform(Number)
  readonly limit?: number;
  
  @IsOptional()
  @ValidateNested()
  @Type(() => SortFieldDto)
  readonly sort?: Array<SortFieldDto<IContract>>;
  
  @IsOptional()
  @ValidateNested()
  @Type(() => WhereFieldsDto)
  readonly where?: WhereFieldsDto[];
}