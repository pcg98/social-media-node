CREATE TABLE `user` (
  id                bigint(20) NOT NULL AUTO_INCREMENT, 
  email             varchar(255) NOT NULL UNIQUE, 
  nickname          varchar(30) NOT NULL UNIQUE, 
  telephone         varchar(20) NOT NULL UNIQUE, 
  password          varchar(255) NOT NULL, 
  bio               varchar(100), 
  sex               enum("men","woman","other") NOT NULL comment 'It should be woman, male or other', 
  createdAt         date DEFAULT CURDATE() NOT NULL, 
  user_statusid     tinyint(3) DEFAULT 1 NOT NULL, 
  user_rolid        tinyint(3) DEFAULT 1 NOT NULL, 
  user_visibilityid tinyint(3) NOT NULL, 
  name              varchar(60) NOT NULL, 
  last_name         varchar(100) NOT NULL, 
  profile_picture   varchar(255) DEFAULT 'default.jpg' NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE user_follower (
  sourceid  bigint(20) NOT NULL, 
  targetid  bigint(20) NOT NULL, 
  createdAt date DEFAULT CURDATE() NOT NULL, 
  PRIMARY KEY (sourceid, 
  targetid));
CREATE TABLE messages (
  id       bigint(20) NOT NULL AUTO_INCREMENT, 
  senderid bigint(20) NOT NULL, 
  targetid bigint(20) NOT NULL, 
  body     varchar(255) NOT NULL comment 'Body del mensaje', 
  sendAt   timestamp DEFAULT now() NOT NULL, 
  PRIMARY KEY (id, 
  senderid, 
  targetid));
CREATE TABLE user_image (
  id        int(10) NOT NULL AUTO_INCREMENT, 
  userid    bigint(20) NOT NULL, 
  title     varchar(80), 
  createdAt date DEFAULT CURDATE() NOT NULL, 
  url       varchar(255), 
  PRIMARY KEY (id));
CREATE TABLE image_comment (
  id           int(11) NOT NULL AUTO_INCREMENT, 
  body         varchar(255) NOT NULL, 
  createdAt    date DEFAULT CURDATE() NOT NULL comment 'If we don''t have any date, we put the actual date in the database', 
  userid       bigint(20) NOT NULL, 
  user_imageid int(10) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE user_report (
  id          int(10) NOT NULL AUTO_INCREMENT, 
  sourceid    bigint(20) NOT NULL, 
  targetid    bigint(20) NOT NULL, 
  reason      varchar(100) NOT NULL comment 'ENum distintos motivos en ele backend, aqui va a ser varchar', 
  explication varchar(255), 
  PRIMARY KEY (id, 
  sourceid, 
  targetid));
CREATE TABLE user_suspension (
  id                  int(10) NOT NULL AUTO_INCREMENT, 
  userid              bigint(20) NOT NULL, 
  untilDate           date NOT NULL, 
  user_reportid       int(10) NOT NULL, 
  user_reportsourceid bigint(20) NOT NULL, 
  user_reporttargetid bigint(20) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE user_following (
  sourceid  bigint(20) NOT NULL, 
  targetid  bigint(20) NOT NULL, 
  createdAt date DEFAULT CURDATE() NOT NULL, 
  PRIMARY KEY (sourceid, 
  targetid));
CREATE TABLE user_blocked (
  sourceid  bigint(20) NOT NULL, 
  targetid  bigint(20) NOT NULL, 
  createdAt date DEFAULT CURDATE() NOT NULL, 
  PRIMARY KEY (sourceid, 
  targetid));
CREATE TABLE user_status (
  id     tinyint(3) NOT NULL AUTO_INCREMENT, 
  status varchar(50) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE user_notification (
  id                    bigint(20) NOT NULL AUTO_INCREMENT, 
  sourceid              bigint(20) NOT NULL, 
  targetid2             bigint(20) NOT NULL, 
  is_see                bit(1) DEFAULT false NOT NULL, 
  notification_objectid int(11) NOT NULL, 
  createdAt             date DEFAULT CURDATE() NOT NULL, 
  PRIMARY KEY (id, 
  sourceid, 
  targetid2));
CREATE TABLE user_rol (
  id  tinyint(3) NOT NULL AUTO_INCREMENT, 
  rol varchar(50) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE user_visibility (
  id         tinyint(3) NOT NULL AUTO_INCREMENT, 
  visibility varchar(50) NOT NULL comment 'Public or private', 
  PRIMARY KEY (id));
CREATE TABLE notification_object (
  id        int(11) NOT NULL AUTO_INCREMENT, 
  entity    varchar(255) NOT NULL, 
  entity_id int(11) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE user_request (
  sourceid  bigint(20) NOT NULL, 
  targetid  bigint(20) NOT NULL, 
  createdAt int(10), 
  PRIMARY KEY (sourceid, 
  targetid));
ALTER TABLE user_follower ADD CONSTRAINT FKuser_follo285732 FOREIGN KEY (sourceid) REFERENCES `user` (id);
ALTER TABLE user_follower ADD CONSTRAINT FKuser_follo995249 FOREIGN KEY (targetid) REFERENCES `user` (id);
ALTER TABLE messages ADD CONSTRAINT FKmessages474135 FOREIGN KEY (senderid) REFERENCES `user` (id);
ALTER TABLE messages ADD CONSTRAINT FKmessages442854 FOREIGN KEY (targetid) REFERENCES `user` (id);
ALTER TABLE user_image ADD CONSTRAINT FKuser_image936503 FOREIGN KEY (userid) REFERENCES `user` (id);
ALTER TABLE image_comment ADD CONSTRAINT FKimage_comm259430 FOREIGN KEY (user_imageid) REFERENCES user_image (id);
ALTER TABLE image_comment ADD CONSTRAINT FKimage_comm153662 FOREIGN KEY (userid) REFERENCES `user` (id);
ALTER TABLE user_report ADD CONSTRAINT FKuser_repor362073 FOREIGN KEY (sourceid) REFERENCES `user` (id);
ALTER TABLE user_report ADD CONSTRAINT FKuser_repor918908 FOREIGN KEY (targetid) REFERENCES `user` (id);
ALTER TABLE user_suspension ADD CONSTRAINT FKuser_suspe277745 FOREIGN KEY (userid) REFERENCES `user` (id);
ALTER TABLE user_following ADD CONSTRAINT FKuser_follo31067 FOREIGN KEY (sourceid) REFERENCES `user` (id);
ALTER TABLE user_following ADD CONSTRAINT FKuser_follo659541 FOREIGN KEY (targetid) REFERENCES `user` (id);
ALTER TABLE user_blocked ADD CONSTRAINT FKuser_block824124 FOREIGN KEY (sourceid) REFERENCES `user` (id);
ALTER TABLE user_blocked ADD CONSTRAINT FKuser_block866483 FOREIGN KEY (targetid) REFERENCES `user` (id);
ALTER TABLE `user` ADD CONSTRAINT FKuser317843 FOREIGN KEY (user_statusid) REFERENCES user_status (id);
ALTER TABLE user_notification ADD CONSTRAINT FKuser_notif8514 FOREIGN KEY (sourceid) REFERENCES `user` (id);
ALTER TABLE user_notification ADD CONSTRAINT FKuser_notif889263 FOREIGN KEY (targetid2) REFERENCES `user` (id);
ALTER TABLE `user` ADD CONSTRAINT FKuser204990 FOREIGN KEY (user_rolid) REFERENCES user_rol (id);
ALTER TABLE user_suspension ADD CONSTRAINT FKuser_suspe528343 FOREIGN KEY (user_reportid, user_reportsourceid, user_reporttargetid) REFERENCES user_report (id, sourceid, targetid);
ALTER TABLE `user` ADD CONSTRAINT FKuser71815 FOREIGN KEY (user_visibilityid) REFERENCES user_visibility (id);
ALTER TABLE user_notification ADD CONSTRAINT FKuser_notif219994 FOREIGN KEY (notification_objectid) REFERENCES notification_object (id);
ALTER TABLE user_request ADD CONSTRAINT FKuser_reque307907 FOREIGN KEY (sourceid) REFERENCES `user` (id);
ALTER TABLE user_request ADD CONSTRAINT FKuser_reque973074 FOREIGN KEY (targetid) REFERENCES `user` (id);
