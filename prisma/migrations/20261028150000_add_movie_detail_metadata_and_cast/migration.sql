ALTER TABLE "movie"
  ADD COLUMN "backdropUrl" TEXT,
  ADD COLUMN "ageRating" TEXT NOT NULL DEFAULT '13+',
  ADD COLUMN "releaseYear" INTEGER,
  ADD COLUMN "genres" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "rating" DOUBLE PRECISION,
  ADD COLUMN "reviewCount" INTEGER,
  ADD COLUMN "audienceScore" INTEGER,
  ADD COLUMN "trailerUrl" TEXT,
  ADD COLUMN "trailerDuration" TEXT,
  ADD COLUMN "viewerMilestone" TEXT;

CREATE TABLE "movie_cast" (
  "id" TEXT NOT NULL,
  "movieId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "isDirector" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,

  CONSTRAINT "movie_cast_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "movie_cast_movieId_sortOrder_idx"
  ON "movie_cast"("movieId", "sortOrder");

ALTER TABLE "movie_cast"
  ADD CONSTRAINT "movie_cast_movieId_fkey"
  FOREIGN KEY ("movieId") REFERENCES "movie"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
