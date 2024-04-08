-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL
);
INSERT INTO "new_books" ("details", "id", "slug", "title") SELECT "details", "id", "slug", "title" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_id_key" ON "books"("id");
CREATE UNIQUE INDEX "books_slug_key" ON "books"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
