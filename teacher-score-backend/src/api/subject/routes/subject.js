"use strict";

/**
 * subject router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::subject.subject");
// module.exports = {
//   routes: [
//     {
//       method: "PATCH",
//       path: "/subjects/:id/update-owner",
//       handler: "subject.updateSubjectWithNewOwner",
//       config: {
//         auth: {
//           required: false,
//         },
//       },
//     },
//   ],
// };
