import { Column, Entity } from 'typeorm';
import { BaseModel } from '@qlean/nestjs-typeorm-persistence-search';
import { ICitizenship } from '../../core/interfaces';
import { IsString } from 'class-validator';

@Entity({
  name: 'citizenship',
})
export class CitizenshipModel extends BaseModel<ICitizenship> {
  @IsString()
  @Column({ unique: true })
  name: string;
}
