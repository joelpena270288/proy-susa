

import { Module } from '@nestjs/common';
import { RoleModule } from './modules/role/role.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from './config/config.module';
import { Configuration } from './config/config.keys';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { LogModule } from './modules/log/log.module';
import { DocumentosModule } from './modules/documentos/documentos.module';











@Module({
   
 imports:[
       
    ConfigModule,
     DatabaseModule,
     UsersModule,
     RoleModule,    
     AuthModule, 
     
     LogModule, DocumentosModule,
  
  
    ]
})
export class AppModule {
 static port: number | string;
 constructor(private readonly _configService:ConfigService){
  AppModule.port = this._configService.get(Configuration.PORT);
 }
  
  
}

