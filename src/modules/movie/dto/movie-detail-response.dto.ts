export interface CastMemberDto {
  name: string;
  role: string;
  imageUrl: string;
  isDirector?: boolean;
}

export interface ShowtimeOptionDto {
  id: string;
  date?: string;
  time: string;
  isSoldOut?: boolean;
}

export interface CinemaScheduleDto {
  id: string;
  name: string;
  type: string;
  typeBadgeClass: string;
  distance: string;
  address: string;
  price: number;
  studioName: string;
  seatsAvailable: number;
  audioFormat: string;
  showtimes: ShowtimeOptionDto[];
}

export interface ScheduleDateDto {
  label: string;
  day: string;
  month: string;
  date: string;
}

export interface MovieDetailResponseDto {
  id: string;
  title: string;
  description: string;
  duration: number;
  posterUrl: string;
  backdropUrl: string;
  ageRating: string;
  releaseYear: number;
  genres: string[];
  rating: number;
  reviewCount: string;
  audienceScore: number;
  trailerUrl: string;
  trailerDuration: string;
  viewerMilestone: string;
  minPrice: number;
  cast: CastMemberDto[];
  cinemas: CinemaScheduleDto[];
  dates: ScheduleDateDto[];
  createdAt: Date | string;
  updatedAt: Date | string;
}
