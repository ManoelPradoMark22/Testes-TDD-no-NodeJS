import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

/* describe serve para CATEGORIZAR os testes */
describe('User', () => {
  /* alguns métodos auxiliares:
  beforeAll() executa antes de todos os testes
  beforeEach() executado antes de cada teste
  afterAll() e afterEach() */
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  /* it tem a mesma funcionalidade do test mas dá uma leitura melhor */
  it('should be able to register', async () => {
    /* poderiamos usar fetch ou axios para fazer as requisicoes http, mas vamos
    usar uma biblioteca que é feita para testes. vamos usaro request da supertest */
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    /* para saber se o usuario foi criado dentro da base de dados. Pegamos o conteudo
    da requisicao (q esta em response.body) e vemos se dentro deste corpo temos
    uma prop chamada id (que é o id do usuario) */
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    // 1ª requisicao
    await request(app)
      .post('/users')
      .send(user);

    // 2ª requisição (com email duplicado)
    const response = await request(app)
      .post('/users')
      .send(user);

    // esperamos que o status de resposta seja 400 (erro na requisição)
    expect(response.status).toBe(400);
  });
});
