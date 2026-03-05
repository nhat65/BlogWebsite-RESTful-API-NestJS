import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1755514774087 implements MigrationInterface {
  name = ' $npmConfigName1755514774087';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`account\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin') NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL ON UPDATE CURRENT_TIMESTAMP, \`createBy\` bigint NULL, \`updateBy\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tag\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`tagName\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL ON UPDATE CURRENT_TIMESTAMP, \`createBy\` varchar(50) NOT NULL, \`updateBy\` varchar(50) NULL, INDEX \`tag_slug_index\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`comment\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`userId\` bigint UNSIGNED NOT NULL, \`postId\` bigint UNSIGNED NOT NULL, \`parentId\` bigint UNSIGNED NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`post_reaction\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`reaction\` enum ('like', 'dislike') NOT NULL, \`postId\` bigint UNSIGNED NOT NULL, \`userId\` bigint UNSIGNED NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`report\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`reportedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`status\` varchar(20) NOT NULL DEFAULT 'pending', \`userId\` bigint UNSIGNED NOT NULL, \`postId\` bigint UNSIGNED NOT NULL, \`updatedAt\` datetime NULL ON UPDATE CURRENT_TIMESTAMP, \`resolvedBy\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`post\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`imageUrl\` varchar(255) NULL, \`status\` enum ('posted', 'scheduled', 'hidden') NOT NULL, \`publishAt\` datetime NULL, \`tagId\` bigint UNSIGNED NOT NULL, \`userId\` bigint UNSIGNED NOT NULL, \`publishedAt\` datetime NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL ON UPDATE CURRENT_TIMESTAMP, \`updateBy\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`appeal\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`type\` enum ('post', 'user') NOT NULL, \`userId\` bigint UNSIGNED NOT NULL, \`postId\` bigint UNSIGNED NULL, \`reason\` varchar(255) NOT NULL, \`message\` text NOT NULL, \`status\` enum ('pending', 'resolved', 'rejected') NOT NULL DEFAULT 'pending', \`resolvedBy\` bigint NULL, \`resolvedAt\` datetime NULL, \`notes\` text NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`fullName\` varchar(255) NOT NULL, \`bio\` varchar(255) NULL, \`avatarUrl\` varchar(255) NULL, \`country\` varchar(255) NOT NULL, \`status\` varchar(50) NOT NULL DEFAULT 'actived', \`accountId\` bigint UNSIGNED NOT NULL, \`joinedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL ON UPDATE CURRENT_TIMESTAMP, \`createBy\` bigint NULL, \`updateBy\` bigint NULL, UNIQUE INDEX \`REL_68d3c22dbd95449360fdbf7a3f\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_e3aebe2bd1c53467a07109be596\` FOREIGN KEY (\`parentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD CONSTRAINT \`FK_5e7b98f3cea583c73a0bbbe0de1\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD CONSTRAINT \`FK_5019c594c963270ac7a6bfafbec\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD CONSTRAINT \`FK_e347c56b008c2057c9887e230aa\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD CONSTRAINT \`FK_4b6fe2df37305bc075a4a16d3ea\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_ea4f65e3049ae22b6b7787fa629\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD CONSTRAINT \`FK_98d567f0b36beb0b380e29b6992\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD CONSTRAINT \`FK_6f2e94c9961965322ab7979eb83\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_68d3c22dbd95449360fdbf7a3f1\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_68d3c22dbd95449360fdbf7a3f1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` DROP FOREIGN KEY \`FK_6f2e94c9961965322ab7979eb83\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` DROP FOREIGN KEY \`FK_98d567f0b36beb0b380e29b6992\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_ea4f65e3049ae22b6b7787fa629\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_4b6fe2df37305bc075a4a16d3ea\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_e347c56b008c2057c9887e230aa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` DROP FOREIGN KEY \`FK_5019c594c963270ac7a6bfafbec\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` DROP FOREIGN KEY \`FK_5e7b98f3cea583c73a0bbbe0de1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_e3aebe2bd1c53467a07109be596\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_68d3c22dbd95449360fdbf7a3f\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`appeal\``);
    await queryRunner.query(`DROP TABLE \`post\``);
    await queryRunner.query(`DROP TABLE \`report\``);
    await queryRunner.query(`DROP TABLE \`post_reaction\``);
    await queryRunner.query(`DROP TABLE \`comment\``);
    await queryRunner.query(`DROP INDEX \`tag_slug_index\` ON \`tag\``);
    await queryRunner.query(`DROP TABLE \`tag\``);
    await queryRunner.query(`DROP TABLE \`account\``);
  }
}
