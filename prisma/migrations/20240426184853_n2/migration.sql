-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Complain" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "picture" TEXT,
    "location" TEXT,
    "lat" TEXT,
    "lang" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Complain" ("createdAt", "id", "lang", "lat", "location", "name", "phone", "picture", "status", "userId") SELECT "createdAt", "id", "lang", "lat", "location", "name", "phone", "picture", "status", "userId" FROM "Complain";
DROP TABLE "Complain";
ALTER TABLE "new_Complain" RENAME TO "Complain";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
