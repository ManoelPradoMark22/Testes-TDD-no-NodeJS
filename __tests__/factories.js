import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';

/* no define damos um nome, geralmente é o mesmo nome do model em questao.
mas um model pode ter várias variações e entao podemos criar nomes diferentes
se quisermos */
factory.define('User', User, {
  name: faker.name.findName(), // cria um nome completo
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
