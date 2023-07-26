import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: "postgres",
    url: getPostgresString(configService),
    ...getPostgresOptions(),
  };
};

export const getPostgresString = (configService: ConfigService) =>
  configService.get("postgresql") +
  "://" +
  configService.get("DB_USERNAME") +
  ":" +
  configService.get("DB_PASSWORD") +
  "@" +
  configService.get("DB_HOST") +
  ":" +
  configService.get("DB_PORT") +
  "/" +
  configService.get("DB_DATABASE");

const getPostgresOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoLoadEntities: true,
  synchronize: true,
});
