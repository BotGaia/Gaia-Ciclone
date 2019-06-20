# Gaia-Ciclone

[![pipeline status](https://gitlab.com/botgaia/Gaia-Ciclone/badges/master/pipeline.svg)](https://gitlab.com/botgaia/Gaia-Ciclone/commits/master)
[![coverage report](https://gitlab.com/botgaia/Gaia-Ciclone/badges/master/coverage.svg)](https://gitlab.com/botgaia/Gaia-Ciclone/commits/master)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

---

## Objetivo

Esse serviço é responsável por informar ao usuário sobre algum ciclone acontecendo pelo mundo. Ele irá utiliza a API externa da [Aeris Weather](https://www.aerisweather.com/support/docs/api/).

Você pode encontrar o serviço nos sequintes links: [homologação](https://ciclone.hml.botgaia.ga/) e [produção](https://ciclone.botgaia.ga/).

## Como contribuir

Se tiver interesse em como contribuir para o projeto, olhe mais sobre o projeto em nossa [wiki](https://github.com/fga-eps-mds/2019.1-Gaia) e dê uma lida também no nosso guia de [contribuição](https://github.com/BotGaia/Gaia-Ciclone/blob/dev/CONTRIBUTING.md).

## Como usar

### Como rodar

O nosso projeto utiliza o Docker e o Docker Compose como ferramentas de desenvolvimento. Para instalar eles, siga o tutorial no site oficial do [Docker](https://www.docker.com/).

Após instalar o docker rode o projeto como desenvolvimento da seguinte maneira, ele será disponibilizado em `localhost:3001`:

```$ sudo docker-compose up --build```

Para rodar os testes, rode esse comando:

``` $ sudo docker-compose run gaiaciclone npm run test ```

Para rodar a folha de estilo, utilize este comando:

``` $ sudo docker-compose run gaiaciclone npm run lint ```

### Endpoints

Para ver quais os endpoints desse serviço, basta acessar a rota principal `/`.
