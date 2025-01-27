"use strict";

/**
 * subject controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::subject.subject", ({ strapi }) => ({
  async find(ctx) {
    const userId = ctx.query.filters?.users_owner?.id?.$eq;

    const filters = userId
      ? {
          users_owner: {
            id: {
              $eq: userId,
            },
          },
        }
      : {};
    try {
      const subjects = await strapi.entityService.findMany(
        "api::subject.subject",
        {
          filters,
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
    } catch (error) {
      ctx.body = {
        error: "An error occurred while fetching subjects",
        details: error.message,
      };
      ctx.status = 500;
    }
  },
  // async updateSubjectWithNewOwner(ctx) {
  //   const { id } = ctx.params;
  //   const { newOwnerId } = ctx.request.body;

  //   try {
  //     const response = await fetch(
  //       `http://localhost:1337/api/users/${newOwnerId}`
  //     );
  //     const newUserData = await response.json();

  //     const existingSubject = await strapi.services.subject.findOne({ id });

  //     const updatedUsersOwner = existingSubject.users_owner
  //       ? [...existingSubject.users_owner, newUserData.data.id]
  //       : [newUserData.data.id];

  //     const updatedSubject = await strapi.services.subject.update(
  //       { id },
  //       {
  //         data: {
  //           users_owner: updatedUsersOwner,
  //         },
  //       }
  //     );

  //     return updatedSubject; // ส่งข้อมูลที่อัปเดตกลับ
  //   } catch (error) {
  //     console.error("Error:", error);
  //     ctx.throw(500, "Internal server error");
  //   }
  // },
}));
