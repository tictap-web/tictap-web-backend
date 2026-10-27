import "dotenv/config";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform: true,
    }),
  );

  app.enableCors({
    credentials: true,
    origin: "http://localhost:3000",
  });

  await app.listen(process.env.PORT ?? 5000);
}

bootstrap();
