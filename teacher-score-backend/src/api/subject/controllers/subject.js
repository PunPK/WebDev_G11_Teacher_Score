"use strict";

/**
 * subject controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::subject.subject", ({ strapi }) => ({
  async find(ctx) {
    const subjects = await strapi.entityService.findMany(
      "api::subject.subject",
      {
        populate: {
          users_owner: {
            fields: ["id", "username", "first_name", "last_name", "email"],
            populate: {
              role: {
                fields: ["name"],
              },
            },
          },
          topics: true,
        },
      }
    );

    ctx.body = subjects;
  },
}));
