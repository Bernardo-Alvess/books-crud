/*
  Warnings:

  - Added the required column `slug` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);
INSERT INTO "new_books" ("id", "title") SELECT "id", "title" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_id_key" ON "books"("id");
CREATE UNIQUE INDEX "books_slug_key" ON "books"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
