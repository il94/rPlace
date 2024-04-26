#!/bin/bash

npx prisma generate
npx prisma migrate dev --name init
npx prisma studio &
npm run start:dev