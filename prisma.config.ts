// import { defineConfig } from 'prisma/config'
// import 'dotenv/config'

// export default defineConfig({
//   earlyAccess: true,
//   schema: 'prisma/schema',
//   datasource: {
//     url: process.env.DATABASE_URL,
//   },
//   migrate: {
//     async adapter() {
//       const { PrismaPg } = await import('@prisma/adapter-pg')
//       return new PrismaPg({
//         connectionString: process.env.DATABASE_URL,
//       })
//     }
//   }
// })

import { defineConfig } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema",
  datasource: {
    url: process.env.DIRECT_URL,
  },
  migrate: {
    async adapter() {
      const { PrismaPg } = await import("@prisma/adapter-pg");
      return new PrismaPg({
        connectionString: process.env.DIRECT_URL,
      });
    },
  },
});
