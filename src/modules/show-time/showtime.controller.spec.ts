import { Test, TestingModule } from "@nestjs/testing";
import { ShowTimeController } from "./showtime.controller";
import { ShowTimeService } from "./show-time.service";

describe("ShowTimeController", () => {
  let controller: ShowTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowTimeController],
      providers: [ShowTimeService],
    }).compile();

    controller = module.get<ShowTimeController>(ShowTimeController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
