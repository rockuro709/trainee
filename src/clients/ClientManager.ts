import { APIRequestContext } from "@playwright/test";
import { WantlistClient } from "./WantlistClient";

export class ClientManager {
  private readonly requestContext: APIRequestContext;
  private readonly username: string;
  private _wantlistClient: WantlistClient | null = null;

  constructor(requestContext: APIRequestContext, username: string) {
    this.requestContext = requestContext;
    this.username = username;
  }

  public get wantlistClient(): WantlistClient {
    if (!this._wantlistClient) {
      this._wantlistClient = new WantlistClient(
        this.requestContext,
        this.username,
      );
    }
    return this._wantlistClient;
  }
}
