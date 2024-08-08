import { Module } from '@nestjs/common';
import { NivelService } from './nivel.service';
import { NivelController } from './nivel.controller';
import { DatabaseModule } from '../../database/database.module';
import { NivelProviders } from './nivel.providers';
import { LogProviders } from '../log/log.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [NivelController],
  providers: [NivelService,...NivelProviders,...LogProviders],
  exports:[NivelService]
})
export class NivelModule {}
