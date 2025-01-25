"use strict";

/**
 * subject controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::subject.subject", ({ strapi }) => ({
  async find(ctx) {
    const userId = ctx.query.filters?.users_owner?.id?.$eq;

    const subjects = await strapi.entityService.findMany(
      "api::subject.subject",
      {
        filters: {
          users_owner: {
            id: {
              $eq: userId,
            },
          },
        },
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
