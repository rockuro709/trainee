// src/types/api/releaseRatingByUser.dto.ts
//ответ от GET и PUT
export interface ReleaseRatingByUserDto {
  username: string;
  release_id: number;
  rating: number;
}

//тело (payload) для PUT
export interface SetRatingPayload {
  rating: number;
}
