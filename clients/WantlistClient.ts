// clients/WantlistClient.ts
import { APIRequestContext } from "@playwright/test";
import {
  AddItemToWantlistResponseDto,
  GetWantlistResponseDto,
} from "../types/api/wantlist.dto";

/**
 * @description Клиент для взаимодействия с Discogs Wantlist API.
 * Авторизация через токен.
 */
export class WantlistClient {
  private readonly request: APIRequestContext;
  private readonly baseUrl: string = "https://api.discogs.com";
  private readonly username: string;

  /**
   * @param requestContext Контекст запроса Playwright, настроенный для авторизованных запросов.
   * @param username Имя пользователя Discogs.
   */
  constructor(requestContext: APIRequestContext, username: string) {
    this.request = requestContext;
    this.username = username.toLowerCase();
  }

  /**
   * @description Добавляет релиз в Wantlist пользователя.
   * @param releaseId ID релиза, который нужно добавить.
   * @returns Promise<any> JSON-ответ от API.
   * @throws Error в случае неудачного ответа API.
   * @see https://www.discogs.com/developers/#page:user-wantlist,header:user-wantlist-add-to-wantlist-put
   */
  async addReleaseToWantlist(
    releaseId: number
  ): Promise<AddItemToWantlistResponseDto> {
    // В документации указан PUT запрос: PUT /users/{username}/wants/{release_id}
    const endpoint = `${this.baseUrl}/users/${this.username}/wants/${releaseId}`;
    console.log(`API: Adding release ${releaseId} to wantlist at ${endpoint}`);
    const response = await this.request.put(endpoint);

    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(
        `Failed to add release ${releaseId} to wantlist. Status: ${response.status()} ${response.statusText()}. Body: ${errorText}`
      );
    }
    console.log(
      `API: Successfully added release ${releaseId}. Status: ${response.status()}`
    );
    return await response.json(); // Discogs возвращает JSON после добавления
  }

  /**
   * @description Удаляет релиз из Wantlist пользователя.
   * @param releaseId ID релиза, который нужно удалить.
   * @returns Promise<void>
   * @throws Error в случае неудачного ответа API.
   * @see https://www.discogs.com/developers/#page:user-wantlist,header:user-wantlist-add-to-wantlist-delete
   */
  async removeReleaseFromWantlist(releaseId: number): Promise<void> {
    // В документации указан DELETE запрос: DELETE /users/{username}/wants/{release_id}
    const endpoint = `${this.baseUrl}/users/${this.username}/wants/${releaseId}`;
    console.log(
      `API: Removing release ${releaseId} from wantlist at ${endpoint}`
    );
    const response = await this.request.delete(endpoint);

    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(
        `Failed to remove release ${releaseId} from wantlist. Status: ${response.status()} ${response.statusText()}. Body: ${errorText}`
      );
    }
    console.log(
      `API: Successfully removed release ${releaseId}. Status: ${response.status()}`
    );
  }

  /**
   * @description Получает список релизов в Wantlist пользователя.
   * @returns Promise<any> JSON-ответ с содержимым Wantlist.
   * @throws Error в случае неудачного ответа API.
   * @see https://www.discogs.com/developers/#page:user-wantlist,header:user-wantlist-wantlist-get
   */
  async getWantlist(): Promise<GetWantlistResponseDto> {
    // В документации указан GET запрос: GET /users/{username}/wants
    const endpoint = `${this.baseUrl}/users/${this.username}/wants`;
    console.log(
      `API: Getting wantlist for user ${this.username} from ${endpoint}`
    );
    const response = await this.request.get(endpoint);

    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(
        `Failed to get wantlist for user ${
          this.username
        }. Status: ${response.status()} ${response.statusText()}. Body: ${errorText}`
      );
    }
    console.log(`API: Successfully got wantlist. Status: ${response.status()}`);
    return await response.json();
  }
}
