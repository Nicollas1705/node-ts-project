# NodeJS + Typescript + SQLite/PostgreSQL

Project created for learning proposal, beginning on backend based on frontend notion. It is a REST API service built in NodeJS and usign Typescript, using SQLite (dev) and PostgreSQL (prod) as database.

## Tags (included in the project)

- Clean architecture
- CRUD
- List with filters + Pagination
- Register + Sign in
- JWT Authentication
- Password encryptation
- Validations (yup)
- Tests + Mocks
- Migrations + Seeds
- Environments config
- Simple CORS config

## About

This project was created in clean architecture structure, with separated/reusable features.

This project can create `cities` and `people`, with each `people` being associated with a `city`.

`cities` and `people` has CRUD endpoints, and also list with filter and pagination for each. Create/Update/Register has its validators (like email) with YUP library.

Only registered and logged in `users` can access `cities` and `people` endpoints (JWT Authentication). Also the `user` password is encrypted.

All endpoints has its tests and mocks to ensure the quality and the consistency in future updates.

It has also some configs: to set Migrations and Seeds; to set the current environment (prod, dev, test), CORS configuration to allow/deny request origin.

### Database structure (SQL)

Each `city` has: `name`

Each `person` has: `name`, `email` and an associated `cityId`

Each `user` has: `name`, `email` and `password`
