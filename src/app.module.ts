import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { AuthorsModule } from './authors/authors.module';
import {GraphQLModule} from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {join} from "path";
import { TypeOrmModule } from '@nestjs/typeorm/';
@Module({
  imports: [PostsModule, AuthorsModule,TypeOrmModule.forRoot({
type: "postgres",
host: "localhost",
port: 5432,
username: "postgres",
password: "pass",
database: "postgres",
entities: ["dist/**/*.entity.{ts,js}"],
synchronize: true, // Set to false in production
  }), GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), "src/schema.gql")
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
