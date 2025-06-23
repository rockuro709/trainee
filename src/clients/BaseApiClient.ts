// src/clients/BaseApiClient.ts
import { APIRequestContext, APIResponse } from "@playwright/test";

type RequestOptions = {
  data?: unknown; //это боди
  params?: { [key: string]: string | number | boolean }; //для запроса с ?параметрами
  headers?: { [key: string]: string };
};

export class BaseApiClient {
  protected readonly request: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.request = requestContext;
  }

  /**
   * Защищенный метод для отправки всех API-запросов.
   * Он будет вызываться из дочерних клиентов (WantlistClient и т.д.).
   * @param method - HTTP-метод ('get', 'post', 'put', 'delete')
   * @param path - Путь к эндпоинту (например, '/users/test/wants')
   * @param options - Дополнительные опции (тело, параметры, заголовки)
   * @returns - Промис с типизированным ответом
   */
  protected async sendApiRequest<T>(
    method: "get" | "post" | "put" | "delete" | "patch",
    path: string,
    options: RequestOptions = {},
  ): Promise<T> {
    console.log(`API Request: ${method.toUpperCase()} ${path}`);

    const response: APIResponse = await this.request[method](path, {
      data: options.data,
      params: options.params,
      headers: options.headers,
    });

    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(
        `API request failed: ${response.status()} ${response.statusText()}. ` +
          `Method: ${method.toUpperCase()}, Path: ${path}. Body: ${errorText}`,
      );
    }

    console.log(`API Response: ${response.status()} ${response.statusText()}`);

    // в удалении боди нет
    if (response.status() === 204) {
      return undefined as T;
    }
    return (await response.json()) as T;
  }
}
