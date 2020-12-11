import { SortFieldDto } from "@qlean/nestjs-typeorm-persistence-search";
import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional, ValidateNested } from "class-validator";
import { IContractor } from "../../../domain";
import { WhereFieldsDto } from "./where-fields.dto";

export class ContractorSearchDto {
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
  readonly sort?: Array<SortFieldDto<IContractor>>;
  
  @IsOptional()
  @ValidateNested()
  @Type(() => WhereFieldsDto)
  readonly where?: WhereFieldsDto[];
}