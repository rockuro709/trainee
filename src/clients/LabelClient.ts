// src/clients/LabelClient.ts
import { APIRequestContext } from "@playwright/test";
import { BaseApiClient } from "./BaseApiClient";
import {
  GetReleasesByLabelIdDto,
  LabelReleasesParams,
  getReleasesByLabelIdSchema,
} from "../types/api/label.schema";

export class LabelClient extends BaseApiClient {
  constructor(requestContext: APIRequestContext) {
    super(requestContext);
  }

  public async getReleasesByLabelId(
    labelId: number,
    params?: LabelReleasesParams,
  ): Promise<GetReleasesByLabelIdDto> {
    const path = `/labels/${labelId}/releases`;
    const response = await this.sendApiRequest<unknown>("get", path, {
      params,
    });
    //проверка зода на соответствие ответа схеме
    const validatedResponse = getReleasesByLabelIdSchema.parse(response);
    return validatedResponse;
  }
}
