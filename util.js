const faker = require('faker');

const generateUser = ({
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  department,
  createdAt = new Date()
} = {}) => ({
  firstName,
  lastName,
  department,
  createdAt
});

const generateArticle = ({
  name = 'Mongodb - introduction',
  description = 'Mongodb - text',
  type,
  tags = []
} = {}) => ({
  name,
  description,
  type,
  tags
});

module.exports = {
  mapArticle: generateArticle,
  getRandomFirstName: () => faker.name.firstName()
};

// module.exports = {
//   mapUser: generateUser,
//   getRandomFirstName: () => faker.name.firstName()
// };
