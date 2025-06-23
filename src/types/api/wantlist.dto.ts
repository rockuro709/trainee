// src/types/api/wantlist.dto.ts
export interface Format {
  name: string;
  qty: string;
  descriptions: string[];
}

export interface Artist {
  name: string;
  id: number;
  resource_url: string;
}

export interface Label {
  name: string;
  catno: string;
  id: number;
  resource_url: string;
}

export interface WantlistBasicInformation {
  id: number;
  title: string;
  year: number;
  resource_url: string;
  artists: Artist[];
  labels: Label[];
  formats: Format[];
  cover_image: string;
  thumb: string;
  genres: string[];
  styles: string[];
}

//ответ при добавлении и один элемент в общем списке
export interface WantlistItemDto {
  id: number;
  resource_url: string;
  date_added: string;
  rating: number;
  notes: string;
  basic_information: WantlistBasicInformation;
}

//для ответа от GET /wants (получение всего списка)
export interface GetWantlistResponseDto {
  pagination: object; //пагинация??
  wants: WantlistItemDto[];
}

//для ответа от PUT /wants/{id} (добавление одного элемента)
//то же самое, что и WantlistItemDto
export type AddItemToWantlistResponseDto = WantlistItemDto;
