// src/types/api/release.dto.ts
export interface ArtistBaseDto {
  resource_url: string;
  username?: string;
  name?: string;
  id?: number;
  anv?: string;
  join?: string;
  role?: string;
  tracks?: string;
  thumbnail_url?: string;
}

export interface CommunityContributorDto {
  resource_url: string;
  username: string;
}

export interface CommunityRatingDto {
  average: number;
  count: number;
}

export interface CommunityDto {
  contributors: CommunityContributorDto[];
  data_quality: string;
  have: number;
  rating: CommunityRatingDto;
  status: string;
  submitter: CommunityContributorDto;
  want: number;
}

export interface CompanyDto {
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  name: string;
  resource_url: string;
  thumbnail_url?: string;
}

export type FormatDescriptionDto = string;

export interface FormatDto {
  descriptions: FormatDescriptionDto[];
  name: string;
  qty: string;
}

export interface IdentifierDto {
  type: string;
  value: string;
}

export interface ImageDto {
  height: number;
  resource_url: string;
  type: string;
  uri: string;
  uri150: string;
  width: number;
}

export interface LabelDto {
  catno: string;
  entity_type: string;
  id: number;
  name: string;
  resource_url: string;
  thumbnail_url?: string;
}

export interface TrackDto {
  duration: string;
  position: string;
  title: string;
  type_: string;
}

export interface VideoDto {
  description: string;
  duration: number;
  embed: boolean;
  title: string;
  uri: string;
}

export interface ReleaseDetailsDto {
  title: string;
  id: number;
  artists: ArtistBaseDto[];
  data_quality: string;
  thumb: string;
  community: CommunityDto;
  companies: CompanyDto[];
  country: string;
  date_added: string;
  date_changed: string;
  estimated_weight: number;
  extraartists: ArtistBaseDto[];
  format_quantity: number;
  formats: FormatDto[];
  genres: string[];
  identifiers: IdentifierDto[];
  images: ImageDto[];
  labels: LabelDto[];
  lowest_price: number;
  master_id: number;
  master_url: string;
  notes: string;
  num_for_sale: number;
  released: string;
  released_formatted: string;
  resource_url: string;
  series: unknown[];
  status: string;
  styles: string[];
  tracklist: TrackDto[];
  uri: string;
  videos: VideoDto[];
  year: number;
  artists_sort: string;
  blocked_from_sale: boolean;
  is_offensive: boolean;
}
