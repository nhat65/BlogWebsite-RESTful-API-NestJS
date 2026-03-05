import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1756193151291 implements MigrationInterface {
  name = ' $npmConfigName1756193151291';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`appeal\` DROP FOREIGN KEY \`FK_6f2e94c9961965322ab7979eb83\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` DROP FOREIGN KEY \`FK_98d567f0b36beb0b380e29b6992\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_e3aebe2bd1c53467a07109be596\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` DROP FOREIGN KEY \`FK_5019c594c963270ac7a6bfafbec\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` DROP FOREIGN KEY \`FK_5e7b98f3cea583c73a0bbbe0de1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_4b6fe2df37305bc075a4a16d3ea\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_e347c56b008c2057c9887e230aa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_68d3c22dbd95449360fdbf7a3f1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_ea4f65e3049ae22b6b7787fa629\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_68d3c22dbd95449360fdbf7a3f\` ON \`user\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`createBy\``);
    await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`updateBy\``);
    await queryRunner.query(`ALTER TABLE \`appeal\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`appeal\` DROP COLUMN \`postId\``);
    await queryRunner.query(
      `ALTER TABLE \`appeal\` DROP COLUMN \`resolvedBy\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` DROP COLUMN \`resolvedAt\``,
    );
    await queryRunner.query(`ALTER TABLE \`appeal\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`appeal\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`postId\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`parentId\``);
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` DROP COLUMN \`postId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` DROP COLUMN \`userId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` DROP COLUMN \`reportedAt\``,
    );
    await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`postId\``);
    await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`report\` DROP COLUMN \`resolvedBy\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`fullName\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatarUrl\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`accountId\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`joinedAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createBy\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updateBy\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`imageUrl\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`publishAt\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`tagId\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`publishedAt\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`updateBy\``);
    await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`tagName\``);
    await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`createBy\``);
    await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`updateBy\``);
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD \`updated_at\` datetime NULL ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD \`create_by\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD \`update_by\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD \`user_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD \`post_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD \`resolved_by\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD \`resolved_at\` datetime NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD \`updated_at\` datetime NULL ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`user_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`post_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`parent_id\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`updated_at\` datetime NULL ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD \`post_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD \`user_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD \`updated_at\` datetime NULL ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD \`reported_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD \`user_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD \`post_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD \`updated_at\` datetime NULL ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD \`resolved_by\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`full_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`avatar_url\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`account_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_6acfec7285fdf9f463462de3e9\` (\`account_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`joined_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updated_at\` datetime NULL ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`create_by\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`update_by\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`image_url\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`publish_at\` datetime NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`tag_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`user_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`published_at\` datetime NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`updated_at\` datetime NULL ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`update_by\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD \`tag_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD \`updated_at\` datetime NULL ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD \`create_by\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD \`update_by\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` CHANGE \`id\` \`id\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`account\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` CHANGE \`role\` \`role\` enum ('user', 'admin') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` CHANGE \`id\` \`id\` bigint NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`appeal\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`appeal\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` CHANGE \`notes\` \`notes\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` CHANGE \`id\` \`id\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`comment\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` CHANGE \`id\` \`id\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`post_reaction\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`post_reaction\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` CHANGE \`id\` \`id\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`report\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`id\` \`id\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`bio\` \`bio\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` CHANGE \`id\` \`id\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`post\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` CHANGE \`id\` \`id\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`tag\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_6acfec7285fdf9f463462de3e9\` ON \`user\` (\`account_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD CONSTRAINT \`FK_694d2108693f7a938ac7655eb67\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD CONSTRAINT \`FK_b8512a7e1c6d94fc4931807ac05\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_bbfe153fa60aa06483ed35ff4a7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_8aa21186314ce53c5b61a0e8c93\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_8bd8d0985c0d077c8129fb4a209\` FOREIGN KEY (\`parent_id\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD CONSTRAINT \`FK_860c24b55da4541f8322a2bdced\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD CONSTRAINT \`FK_30ae9db858e049c9fcb6f9c2b38\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD CONSTRAINT \`FK_c6686efa4cd49fa9a429f01bac8\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD CONSTRAINT \`FK_265b3dc7c7f692f016115d46a29\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_6acfec7285fdf9f463462de3e9f\` FOREIGN KEY (\`account_id\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_3364a9669ea4b632cff0eb01944\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_52378a74ae3724bcab44036645b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_52378a74ae3724bcab44036645b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_3364a9669ea4b632cff0eb01944\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_6acfec7285fdf9f463462de3e9f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_265b3dc7c7f692f016115d46a29\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_c6686efa4cd49fa9a429f01bac8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` DROP FOREIGN KEY \`FK_30ae9db858e049c9fcb6f9c2b38\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` DROP FOREIGN KEY \`FK_860c24b55da4541f8322a2bdced\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_8bd8d0985c0d077c8129fb4a209\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_8aa21186314ce53c5b61a0e8c93\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_bbfe153fa60aa06483ed35ff4a7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` DROP FOREIGN KEY \`FK_b8512a7e1c6d94fc4931807ac05\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` DROP FOREIGN KEY \`FK_694d2108693f7a938ac7655eb67\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_6acfec7285fdf9f463462de3e9\` ON \`user\``,
    );
    await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`tag\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`tag\` CHANGE \`id\` \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`post\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`post\` CHANGE \`id\` \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`bio\` \`bio\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`id\` \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`report\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`report\` CHANGE \`id\` \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`post_reaction\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD PRIMARY KEY (\`id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` CHANGE \`id\` \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`comment\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`comment\` CHANGE \`id\` \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` CHANGE \`notes\` \`notes\` text NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`ALTER TABLE \`appeal\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD \`id\` bigint NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`appeal\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`appeal\` CHANGE \`id\` \`id\` bigint NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` CHANGE \`role\` \`role\` enum ('user', 'admin') NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`account\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`account\` CHANGE \`id\` \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`update_by\``);
    await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`create_by\``);
    await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`created_at\``);
    await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`tag_name\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`update_by\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`created_at\``);
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP COLUMN \`published_at\``,
    );
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`user_id\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`tag_id\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`publish_at\``);
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`image_url\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`update_by\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`create_by\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`joined_at\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_6acfec7285fdf9f463462de3e9\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`account_id\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatar_url\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`full_name\``);
    await queryRunner.query(
      `ALTER TABLE \`report\` DROP COLUMN \`resolved_by\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`post_id\``);
    await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`user_id\``);
    await queryRunner.query(
      `ALTER TABLE \`report\` DROP COLUMN \`reported_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` DROP COLUMN \`user_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` DROP COLUMN \`post_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP COLUMN \`parent_id\``,
    );
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`post_id\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`user_id\``);
    await queryRunner.query(
      `ALTER TABLE \`appeal\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` DROP COLUMN \`resolved_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` DROP COLUMN \`resolved_by\``,
    );
    await queryRunner.query(`ALTER TABLE \`appeal\` DROP COLUMN \`post_id\``);
    await queryRunner.query(`ALTER TABLE \`appeal\` DROP COLUMN \`user_id\``);
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP COLUMN \`update_by\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP COLUMN \`create_by\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD \`updateBy\` varchar(50) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD \`createBy\` varchar(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD \`updatedAt\` datetime NULL DEFAULT 'NULL' ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tag\` ADD \`tagName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`updateBy\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`updatedAt\` datetime NULL DEFAULT 'NULL' ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`publishedAt\` datetime NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`userId\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`tagId\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`publishAt\` datetime NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`imageUrl\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updateBy\` bigint NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`createBy\` bigint NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updatedAt\` datetime NULL DEFAULT 'NULL' ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`joinedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`accountId\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`avatarUrl\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`fullName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD \`resolvedBy\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD \`updatedAt\` datetime NULL DEFAULT 'NULL' ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD \`postId\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD \`userId\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD \`reportedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD \`updatedAt\` datetime NULL DEFAULT 'NULL' ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD \`userId\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD \`postId\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`updatedAt\` datetime NULL DEFAULT 'NULL' ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`parentId\` bigint UNSIGNED NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`postId\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`userId\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD \`updatedAt\` datetime NULL DEFAULT 'NULL' ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD \`resolvedAt\` datetime NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD \`resolvedBy\` bigint NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD \`postId\` bigint UNSIGNED NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD \`userId\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD \`updateBy\` bigint NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD \`createBy\` bigint NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD \`updatedAt\` datetime NULL DEFAULT 'NULL' ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_68d3c22dbd95449360fdbf7a3f\` ON \`user\` (\`accountId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_ea4f65e3049ae22b6b7787fa629\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_68d3c22dbd95449360fdbf7a3f1\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD CONSTRAINT \`FK_e347c56b008c2057c9887e230aa\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report\` ADD CONSTRAINT \`FK_4b6fe2df37305bc075a4a16d3ea\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD CONSTRAINT \`FK_5e7b98f3cea583c73a0bbbe0de1\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post_reaction\` ADD CONSTRAINT \`FK_5019c594c963270ac7a6bfafbec\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_e3aebe2bd1c53467a07109be596\` FOREIGN KEY (\`parentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD CONSTRAINT \`FK_98d567f0b36beb0b380e29b6992\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appeal\` ADD CONSTRAINT \`FK_6f2e94c9961965322ab7979eb83\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
