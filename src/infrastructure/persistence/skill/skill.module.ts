import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillModel } from './skill.model';
import { SkillStore } from './skill.store';

@Module({
  imports: [TypeOrmModule.forFeature([SkillModel])],
  exports: [SkillStore],
  providers: [SkillStore],
})
export class SkillPersistenceModule {}
