

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

import { EdificioModule } from './modules/edificio/edificio.module';
import { ParqueoModule } from './modules/parqueo/parqueo.module';
import { TituloModule } from './modules/titulo/titulo.module';
import { ContratoModule } from './modules/contrato/contrato.module';

import { NivelModule } from './modules/nivel/nivel.module';
import { PlantaTratamientoModule } from './modules/planta-tratamiento/planta-tratamiento.module';
import { CisternaModule } from './modules/cisterna/cisterna.module';
import { UbicacionModule } from './modules/ubicacion/ubicacion.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ApartamentoModule } from './modules/apartamento/apartamento.module';
import { ProyectoModule } from './modules/proyecto/proyecto.module';

@Module({
   
 imports:[
       
    ConfigModule,
     DatabaseModule,
     UsersModule,
     RoleModule,    
     AuthModule, 
     
     LogModule, DocumentosModule, EdificioModule, ParqueoModule, TituloModule, ContratoModule,  NivelModule, PlantaTratamientoModule, CisternaModule, UbicacionModule, ClienteModule, ApartamentoModule, ProyectoModule,
  
  
    ]
})
export class AppModule {
 static port: number | string;
 constructor(private readonly _configService:ConfigService){
  AppModule.port = this._configService.get(Configuration.PORT);
 }
  
  
}

