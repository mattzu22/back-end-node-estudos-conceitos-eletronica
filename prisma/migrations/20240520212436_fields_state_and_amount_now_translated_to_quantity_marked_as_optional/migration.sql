/*
  Warnings:

  - You are about to drop the column `amount` on the `parts` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_parts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "state" BOOLEAN,
    "qauntity" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_parts" ("brand", "createdAt", "id", "model", "state", "type") SELECT "brand", "createdAt", "id", "model", "state", "type" FROM "parts";
DROP TABLE "parts";
ALTER TABLE "new_parts" RENAME TO "parts";
PRAGMA foreign_key_check("parts");
PRAGMA foreign_keys=ON;
