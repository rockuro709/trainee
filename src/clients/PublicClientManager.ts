// src/clients/PublicClientManager.ts
import { APIRequestContext } from "@playwright/test";
import { LabelClient } from "./LabelClient";

export class PublicClientManager {
  private readonly requestContext: APIRequestContext;
  private _labelClient: LabelClient | null = null;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  public get labelClient(): LabelClient {
    if (!this._labelClient) {
      this._labelClient = new LabelClient(this.requestContext);
    }
    return this._labelClient;
  }
}
