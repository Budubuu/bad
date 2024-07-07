# RSERVATION SYSTEM

주특기 플러스주차 개인과제

- [API 명세서 링크](https://www.notion.so/8e52db4ed96a446d8f35930b4eba7e8d?v=9c6490e6a7064abb94c0fd999219e5bc&pvs=4)

- [ERD 링크](https://drawsql.app/teams/josaw/diagrams/-3)

### 폴더 구조

```markdown
📦src
┣ 📂auth
┃ ┣ 📜auth.module.ts
┃ ┣ 📜jwt.strategy.ts
┃ ┣ 📜roles.decorator.ts
┃ ┗ 📜roles.guard.ts
┣ 📂reservation
┃ ┣ 📂dto
┃ ┃ ┗ 📜reservation.dto.ts
┃ ┣ 📂entities
┃ ┃ ┗ 📜reservation.entity.ts
┃ ┣ 📜reservation.controller.spec.ts
┃ ┣ 📜reservation.controller.ts
┃ ┣ 📜reservation.module.ts
┃ ┣ 📜reservation.service.spec.ts
┃ ┗ 📜reservation.service.ts
┣ 📂shows
┃ ┣ 📂dto
┃ ┃ ┣ 📜get-show.dto.ts
┃ ┃ ┗ 📜update-show.dto.ts
┃ ┣ 📂entities
┃ ┃ ┣ 📜show.entity.ts
┃ ┃ ┗ 📜show_information.entity.ts
┃ ┣ 📜shows.controller.spec.ts
┃ ┣ 📜shows.controller.ts
┃ ┣ 📜shows.module.ts
┃ ┣ 📜shows.service.spec.ts
┃ ┗ 📜shows.service.ts
┣ 📂user
┃ ┣ 📂dto
┃ ┃ ┣ 📜login.dto.ts
┃ ┃ ┗ 📜register.dto.ts
┃ ┣ 📂entities
┃ ┃ ┗ 📜user.entity.ts
┃ ┣ 📂types
┃ ┃ ┣ 📜reservation.status.ts
┃ ┃ ┗ 📜userRole.type.ts
┃ ┣ 📜user.controller.spec.ts
┃ ┣ 📜user.controller.ts
┃ ┣ 📜user.module.ts
┃ ┣ 📜user.service.spec.ts
┃ ┗ 📜user.service.ts
┣ 📂utils
┃ ┗ 📜userInfo.decorator.ts
┣ 📜app.controller.spec.ts
┣ 📜app.controller.ts
┣ 📜app.module.ts
┣ 📜app.service.ts
┗ 📜main.ts
.env
.gitignore
.prettierrc
package-lock.json
package.json
README.md
yarn.lock
```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
