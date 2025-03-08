This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
nvm use 22.14

npm run dev
```

You can also use these commands:
```bash
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Prisma Database Hosted with Neon

To make sure Prisma is installed if necessary:
`npm install -D prisma @prisma/client`

Then to init your db:
`npx prisma init`

Then generate necessary prisma files in project using:
`npx prisma generate`

Then create your first migration after you create your tables in the schema.prisma file:
`npx prisma migrate dev --name migrationName`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Notes

When finished editing schema.prisma file, or adding new tables/fields, always run these commands:
`npx prisma generate`

`npx prisma migrate dev --name add_user_based_tables` while "add_user_based_tables" should be a message relating to what you did.

DB is hosted on Neon

### Seeding DB

Sample-data.ts is the data used to seed the db with the script seed.ts using the command `npx ts ./db/seed`