const subject = require("../../api/subject/controllers/subject");

module.exports = (plugin) => {
  plugin.controllers.user.me = async (ctx) => {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized();
    }

    // Fetch the full user with role information
    const completeUser = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      user.id,
      { populate: ["role"] }
    );

    ctx.body = {
      id: completeUser.id,
      username: completeUser.username,
      email: completeUser.email,
      confirmed: completeUser.confirmed,
      blocked: completeUser.blocked,
      role: completeUser.role,
      subject: completeUser.subject,
    };
  };

  return plugin;
};
