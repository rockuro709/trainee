// src/clients/PublicClientManager.ts
import { APIRequestContext } from "@playwright/test";
import { LabelClient } from "./LabelClient";
import { ReleaseClient } from "./ReleaseClient";

export class PublicClientManager {
  private readonly requestContext: APIRequestContext;
  private _labelClient: LabelClient | null = null;
  private _releaseClient: ReleaseClient | null = null;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  public get labelClient(): LabelClient {
    if (!this._labelClient) {
      this._labelClient = new LabelClient(this.requestContext);
    }
    return this._labelClient;
  }

  public get releaseClient(): ReleaseClient {
    if (!this._releaseClient) {
      this._releaseClient = new ReleaseClient(this.requestContext);
    }
    return this._releaseClient;
  }
}
