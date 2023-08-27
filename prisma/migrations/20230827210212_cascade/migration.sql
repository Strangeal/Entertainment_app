-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_mediaId_fkey";

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
