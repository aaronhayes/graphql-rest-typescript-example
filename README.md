# Apollo Express + Sofa + Swagger UI Example

This is a basic example of settings up a GraphQL Server using Typescript and wrapping those endpoints with automatically generated REST APIs. We're using Sofa to use generate the REST APIs, and swagger to expose documentation.

## Getting Started

1. Install Node Depdencies `yarn`
2. Start Express Server `yarn start`

This produces three endpoints:

- [GraphQL Server - http://localhost:4123/graphql](http://localhost:4123/graphql)
- [Swagger UI - http://localhost:4123/docs](http://localhost:4123/docs)
- [REST API Endpoint - http://localhost:4123/api](http://localhost:4123/api)

## Further Readings

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Sofa REST](https://sofa-api.com)
- [Swagger UI](https://github.com/scottie1984/swagger-ui-express)
- [TypeScript](https://www.typescriptlang.org/)
