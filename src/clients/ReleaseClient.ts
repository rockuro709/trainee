// src/clients/ReleaseClient.ts
import { APIRequestContext } from "@playwright/test";
import { BaseApiClient } from "./BaseApiClient";
import { ReleaseDetailsDto } from "../types/api/release.dto";

export class ReleaseClient extends BaseApiClient {
  constructor(requestContext: APIRequestContext) {
    super(requestContext);
  }

  public getReleaseById(releaseId: number): Promise<ReleaseDetailsDto> {
    const path = `/releases/${releaseId}`;
    return this.sendApiRequest<ReleaseDetailsDto>("get", path);
  }
}
