// src/clients/WantlistClient.ts
import { APIRequestContext } from "@playwright/test";
import { BaseApiClient } from "./BaseApiClient";
import {
  AddItemToWantlistResponseDto,
  GetWantlistResponseDto,
} from "../types/api/wantlist.dto";

export class WantlistClient extends BaseApiClient {
  private readonly username: string;

  constructor(requestContext: APIRequestContext, username: string) {
    super(requestContext);
    this.username = username.toLowerCase();
  }

  public getWantlist(): Promise<GetWantlistResponseDto> {
    const path = `/users/${this.username}/wants`;
    return this.sendApiRequest<GetWantlistResponseDto>("get", path);
  }

  public addReleaseToWantlist(
    releaseId: number,
  ): Promise<AddItemToWantlistResponseDto> {
    const path = `/users/${this.username}/wants/${releaseId}`;
    return this.sendApiRequest<AddItemToWantlistResponseDto>("put", path);
  }

  public removeReleaseFromWantlist(releaseId: number): Promise<void> {
    const path = `/users/${this.username}/wants/${releaseId}`;
    return this.sendApiRequest<void>("delete", path);
  }
}
