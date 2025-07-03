// src/clients/ReleaseRatingByUserClient.ts
import { APIRequestContext } from "@playwright/test";
import { BaseApiClient } from "./BaseApiClient";
import {
  ReleaseRatingByUserDto,
  SetRatingPayload,
} from "../types/api/releaseRatingByUser.dto";

export class ReleaseRatingByUserClient extends BaseApiClient {
  private readonly username: string;

  constructor(requestContext: APIRequestContext, username: string) {
    super(requestContext);
    this.username = username.toLowerCase();
  }

  public getRatingForReleaseByUser(
    releaseId: number,
  ): Promise<ReleaseRatingByUserDto> {
    const path = `/releases/${releaseId}/rating/${this.username}`;
    return this.sendApiRequest<ReleaseRatingByUserDto>("get", path);
  }

  public putRatingForReleaseByUser(
    releaseId: number,
    rating: number,
  ): Promise<ReleaseRatingByUserDto> {
    const path = `/releases/${releaseId}/rating/${this.username}`;
    //тело запроса
    const payload: SetRatingPayload = { rating };
    return this.sendApiRequest<ReleaseRatingByUserDto>("put", path, {
      data: payload,
    });
  }

  public deleteRatingForReleaseByUser(releaseId: number): Promise<void> {
    const path = `/releases/${releaseId}/rating/${this.username}`;
    return this.sendApiRequest<void>("delete", path);
  }
}
