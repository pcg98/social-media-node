var DataTypes = require("sequelize").DataTypes;
var _conversations = require("./conversations");
var _image_comment = require("./image_comment");
var _messages = require("./messages");
var _notification_object = require("./notification_object");
var _user = require("./user");
var _user_blocked = require("./user_blocked");
var _user_follower = require("./user_follower");
var _user_following = require("./user_following");
var _user_image = require("./user_image");
var _user_notification = require("./user_notification");
var _user_report = require("./user_report");
var _user_request = require("./user_request");
var _user_rol = require("./user_rol");
var _user_status = require("./user_status");
var _user_suspension = require("./user_suspension");
var _user_visibility = require("./user_visibility");

function initModels(sequelize) {
  var conversations = _conversations(sequelize, DataTypes);
  var image_comment = _image_comment(sequelize, DataTypes);
  var messages = _messages(sequelize, DataTypes);
  var notification_object = _notification_object(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_blocked = _user_blocked(sequelize, DataTypes);
  var user_follower = _user_follower(sequelize, DataTypes);
  var user_following = _user_following(sequelize, DataTypes);
  var user_image = _user_image(sequelize, DataTypes);
  var user_notification = _user_notification(sequelize, DataTypes);
  var user_report = _user_report(sequelize, DataTypes);
  var user_request = _user_request(sequelize, DataTypes);
  var user_rol = _user_rol(sequelize, DataTypes);
  var user_status = _user_status(sequelize, DataTypes);
  var user_suspension = _user_suspension(sequelize, DataTypes);
  var user_visibility = _user_visibility(sequelize, DataTypes);

  user.belongsToMany(user, { as: 'targetid_users', through: user_blocked, foreignKey: "sourceid", otherKey: "targetid" });
  user.belongsToMany(user, { as: 'sourceid_users', through: user_blocked, foreignKey: "targetid", otherKey: "sourceid" });
  user.belongsToMany(user, { as: 'targetid_user_user_followers', through: user_follower, foreignKey: "sourceid", otherKey: "targetid" });
  user.belongsToMany(user, { as: 'sourceid_user_user_followers', through: user_follower, foreignKey: "targetid", otherKey: "sourceid" });
  user.belongsToMany(user, { as: 'targetid_user_user_followings', through: user_following, foreignKey: "sourceid", otherKey: "targetid" });
  user.belongsToMany(user, { as: 'sourceid_user_user_followings', through: user_following, foreignKey: "targetid", otherKey: "sourceid" });
  user.belongsToMany(user, { as: 'sourceid_user_user_notifications', through: user_notification, foreignKey: "sourceid", otherKey: "targetid" });
  user.belongsToMany(user, { as: 'targetid_user_user_notifications', through: user_notification, foreignKey: "targetid", otherKey: "sourceid" });
  user.belongsToMany(user, { as: 'targetid_user_user_reports', through: user_report, foreignKey: "sourceid", otherKey: "targetid" });
  user.belongsToMany(user, { as: 'sourceid_user_user_reports', through: user_report, foreignKey: "targetid", otherKey: "sourceid" });
  user.belongsToMany(user, { as: 'targetid_user_user_requests', through: user_request, foreignKey: "sourceid", otherKey: "targetid" });
  user.belongsToMany(user, { as: 'sourceid_user_user_requests', through: user_request, foreignKey: "targetid", otherKey: "sourceid" });
  messages.belongsTo(conversations, { as: "conversation", foreignKey: "conversationsid"});
  conversations.hasMany(messages, { as: "messages", foreignKey: "conversationsid"});
  user_notification.belongsTo(notification_object, { as: "notification_object", foreignKey: "notification_objectid"});
  notification_object.hasMany(user_notification, { as: "user_notifications", foreignKey: "notification_objectid"});
  conversations.belongsTo(user, { as: "source", foreignKey: "sourceid"});
  user.hasMany(conversations, { as: "conversations", foreignKey: "sourceid"});
  conversations.belongsTo(user, { as: "target", foreignKey: "targetid"});
  user.hasMany(conversations, { as: "target_conversations", foreignKey: "targetid"});
  image_comment.belongsTo(user, { as: "user", foreignKey: "userid"});
  user.hasMany(image_comment, { as: "image_comments", foreignKey: "userid"});
  messages.belongsTo(user, { as: "user", foreignKey: "userid"});
  user.hasMany(messages, { as: "messages", foreignKey: "userid"});
  user_blocked.belongsTo(user, { as: "source", foreignKey: "sourceid"});
  user.hasMany(user_blocked, { as: "user_blockeds", foreignKey: "sourceid"});
  user_blocked.belongsTo(user, { as: "target", foreignKey: "targetid"});
  user.hasMany(user_blocked, { as: "target_user_blockeds", foreignKey: "targetid"});
  user_follower.belongsTo(user, { as: "source", foreignKey: "sourceid"});
  user.hasMany(user_follower, { as: "user_followers", foreignKey: "sourceid"});
  user_follower.belongsTo(user, { as: "target", foreignKey: "targetid"});
  user.hasMany(user_follower, { as: "target_user_followers", foreignKey: "targetid"});
  user_following.belongsTo(user, { as: "source", foreignKey: "sourceid"});
  user.hasMany(user_following, { as: "user_followings", foreignKey: "sourceid"});
  user_following.belongsTo(user, { as: "target", foreignKey: "targetid"});
  user.hasMany(user_following, { as: "target_user_followings", foreignKey: "targetid"});
  user_image.belongsTo(user, { as: "user", foreignKey: "userid"});
  user.hasMany(user_image, { as: "user_images", foreignKey: "userid"});
  user_notification.belongsTo(user, { as: "source", foreignKey: "sourceid"});
  user.hasMany(user_notification, { as: "user_notifications", foreignKey: "sourceid"});
  user_notification.belongsTo(user, { as: "target", foreignKey: "targetid"});
  user.hasMany(user_notification, { as: "targetid_user_notifications", foreignKey: "targetid"});
  user_report.belongsTo(user, { as: "source", foreignKey: "sourceid"});
  user.hasMany(user_report, { as: "user_reports", foreignKey: "sourceid"});
  user_report.belongsTo(user, { as: "target", foreignKey: "targetid"});
  user.hasMany(user_report, { as: "target_user_reports", foreignKey: "targetid"});
  user_request.belongsTo(user, { as: "source", foreignKey: "sourceid"});
  user.hasMany(user_request, { as: "user_requests", foreignKey: "sourceid"});
  user_request.belongsTo(user, { as: "target", foreignKey: "targetid"});
  user.hasMany(user_request, { as: "target_user_requests", foreignKey: "targetid"});
  user_suspension.belongsTo(user, { as: "user", foreignKey: "userid"});
  user.hasMany(user_suspension, { as: "user_suspensions", foreignKey: "userid"});
  image_comment.belongsTo(user_image, { as: "user_image", foreignKey: "user_imageid"});
  user_image.hasMany(image_comment, { as: "image_comments", foreignKey: "user_imageid"});
  user_suspension.belongsTo(user_report, { as: "user_report", foreignKey: "user_reportid"});
  user_report.hasMany(user_suspension, { as: "user_suspensions", foreignKey: "user_reportid"});
  user_suspension.belongsTo(user_report, { as: "user_reportsource", foreignKey: "user_reportsourceid"});
  user_report.hasMany(user_suspension, { as: "user_reportsource_user_suspensions", foreignKey: "user_reportsourceid"});
  user_suspension.belongsTo(user_report, { as: "user_reporttarget", foreignKey: "user_reporttargetid"});
  user_report.hasMany(user_suspension, { as: "user_reporttarget_user_suspensions", foreignKey: "user_reporttargetid"});
  user.belongsTo(user_rol, { as: "user_rol", foreignKey: "user_rolid"});
  user_rol.hasMany(user, { as: "users", foreignKey: "user_rolid"});
  user.belongsTo(user_status, { as: "user_status", foreignKey: "user_statusid"});
  user_status.hasMany(user, { as: "users", foreignKey: "user_statusid"});
  user.belongsTo(user_visibility, { as: "user_visibility", foreignKey: "user_visibilityid"});
  user_visibility.hasMany(user, { as: "users", foreignKey: "user_visibilityid"});

  return {
    ImageComment:image_comment,
    Message: messages,
    Conversation: conversations,
    NotificationObject: notification_object,
    User: user,
    UserBlocked: user_blocked,
    UserFollower: user_follower,
    UserFollowing: user_following,
    UserRequest: user_request,
    UserImage: user_image,
    UserNotification: user_notification,
    user_report,
    user_rol,
    user_status,
    user_suspension,
    user_visibility,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
