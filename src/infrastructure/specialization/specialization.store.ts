import {Injectable} from "@nestjs/common";
import {CrudStore, SearchHelper} from "@qlean/nestjs-typeorm-persistence-search";
import {SpecializationModel} from "./specialization.model";
import {Logger} from "@qlean/nestjs-logger";
import {ClassType} from "class-transformer/ClassTransformer";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class SpecializationStore extends CrudStore<SpecializationModel>{
  protected readonly logger = new Logger(SpecializationStore.name);
  protected readonly helper = new SearchHelper<SpecializationModel>();
  protected readonly model: ClassType<SpecializationModel> = SpecializationModel;

  constructor(
    @InjectRepository(SpecializationModel)
    protected readonly repository: Repository<SpecializationModel>
  ) {
    super();
  }
}