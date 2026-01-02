-- CreateTable
CREATE TABLE `ac_leads` (
    `id` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(64) NULL,
    `email` VARCHAR(191) NULL,
    `stage` ENUM('New', 'Qualified', 'Booked', 'Cold', 'Won', 'Lost') NOT NULL DEFAULT 'New',
    `notes` TEXT NULL,
    `nextFollowUpAt` DATETIME(3) NULL,
    `ai` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ac_leads_tenantId_stage_idx`(`tenantId`, `stage`),
    INDEX `ac_leads_tenantId_nextFollowUpAt_idx`(`tenantId`, `nextFollowUpAt`),
    INDEX `ac_leads_tenantId_updatedAt_idx`(`tenantId`, `updatedAt`),
    UNIQUE INDEX `ac_leads_tenantId_id_key`(`tenantId`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ac_conversations` (
    `id` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,
    `leadId` VARCHAR(191) NOT NULL,
    `channel` VARCHAR(32) NOT NULL,
    `unreadCount` INTEGER NOT NULL DEFAULT 0,
    `lastAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ac_conversations_tenantId_leadId_idx`(`tenantId`, `leadId`),
    INDEX `ac_conversations_tenantId_lastAt_idx`(`tenantId`, `lastAt`),
    UNIQUE INDEX `ac_conversations_tenantId_id_key`(`tenantId`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ac_messages` (
    `id` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,
    `conversationId` VARCHAR(191) NOT NULL,
    `at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `from` ENUM('lead', 'ai', 'human') NOT NULL,
    `text` TEXT NOT NULL,

    INDEX `ac_messages_tenantId_conversationId_at_idx`(`tenantId`, `conversationId`, `at`),
    INDEX `ac_messages_tenantId_at_idx`(`tenantId`, `at`),
    UNIQUE INDEX `ac_messages_tenantId_id_key`(`tenantId`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ac_appointments` (
    `id` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,
    `leadId` VARCHAR(191) NOT NULL,
    `service` VARCHAR(191) NOT NULL,
    `startAt` DATETIME(3) NOT NULL,
    `durationMin` INTEGER NOT NULL,
    `status` ENUM('Booked', 'Pending', 'Canceled') NOT NULL DEFAULT 'Booked',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ac_appointments_tenantId_leadId_startAt_idx`(`tenantId`, `leadId`, `startAt`),
    INDEX `ac_appointments_tenantId_startAt_idx`(`tenantId`, `startAt`),
    UNIQUE INDEX `ac_appointments_tenantId_id_key`(`tenantId`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ac_settings` (
    `id` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,
    `businessName` VARCHAR(191) NOT NULL DEFAULT 'Your Business',
    `timezone` VARCHAR(64) NOT NULL DEFAULT 'America/New_York',
    `hoursJson` JSON NULL,
    `servicesJson` JSON NULL,
    `faqsJson` JSON NULL,
    `qualQsJson` JSON NULL,
    `bookingJson` JSON NULL,
    `followupsJson` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ac_settings_tenantId_key`(`tenantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ac_followup_steps` (
    `id` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,
    `settingsId` VARCHAR(191) NOT NULL,
    `stepKey` VARCHAR(64) NOT NULL,
    `afterHours` INTEGER NOT NULL,
    `message` TEXT NOT NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ac_followup_steps_tenantId_settingsId_sortOrder_idx`(`tenantId`, `settingsId`, `sortOrder`),
    UNIQUE INDEX `ac_followup_steps_tenantId_settingsId_stepKey_key`(`tenantId`, `settingsId`, `stepKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ac_conversations` ADD CONSTRAINT `ac_conversations_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `ac_leads`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ac_messages` ADD CONSTRAINT `ac_messages_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `ac_conversations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ac_appointments` ADD CONSTRAINT `ac_appointments_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `ac_leads`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ac_followup_steps` ADD CONSTRAINT `ac_followup_steps_settingsId_fkey` FOREIGN KEY (`settingsId`) REFERENCES `ac_settings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

