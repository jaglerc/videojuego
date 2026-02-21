-- AlterTable
ALTER TABLE "PlayerStand" ADD COLUMN     "seedEarned" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Stand" ADD COLUMN     "description" TEXT;
