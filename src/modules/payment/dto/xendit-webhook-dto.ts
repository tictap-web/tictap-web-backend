import { IsOptional, IsString, IsUUID } from "class-validator";

export class XenditWebhookDto {
  @IsString()
  payment_request_id!: string;

  @IsString()
  status!: XenditPaymentStatus;

  @IsOptional()
  @IsString()
  latest_payment_id?: string;
}

export enum XenditPaymentStatus {
  REQUIRES_ACTION = "REQUIRES_ACTION",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
}
