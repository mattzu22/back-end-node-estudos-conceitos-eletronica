-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_parts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "state" TEXT,
    "quantity" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_parts" ("brand", "createdAt", "id", "model", "quantity", "state", "type") SELECT "brand", "createdAt", "id", "model", "quantity", "state", "type" FROM "parts";
DROP TABLE "parts";
ALTER TABLE "new_parts" RENAME TO "parts";
PRAGMA foreign_key_check("parts");
PRAGMA foreign_keys=ON;
