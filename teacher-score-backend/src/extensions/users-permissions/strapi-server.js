module.exports = (plugin) => {
  plugin.controllers.user.me = async (ctx) => {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized();
    }
    const completeUser = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      user.id,
      { populate: ["role", "subject_owners", "score_owers"] }
    );

    ctx.body = {
      id: completeUser.id,
      username: completeUser.username,
      first_name: completeUser.first_name,
      last_name: completeUser.last_name,
      email: completeUser.email,
      confirmed: completeUser.confirmed,
      blocked: completeUser.blocked,
      role: completeUser.role,
      subject: completeUser.subject_owners,
      score: completeUser.score_owers,
    };
  };

  return plugin;
};
