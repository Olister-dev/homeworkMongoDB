'use strict';

const {mapUser, mapArticle, getRandomFirstName} = require('./util');

// db connection and settings
const connection = require('./config/connection');
let userCollection;
let articlesCollection;
// run();
runArticle();

// async function run() {
//   await connection.connect();
//   await connection.get().dropCollection('users');
//   await connection.get().createCollection('users');
//   userCollection = connection.get().collection('users');

//   await example1();
//   await example2();
//   await example3();
//   await example4();
//   console.log('111');
//   await connection.close();
// }

async function runArticle() {
  await connection.connect();
  await connection.get().dropCollection('articles');
  await connection.get().createCollection('articles');
  articlesCollection = connection.get().collection('articles');
  console.log('222');
  await article1();
  await article2();
  await article3();
  await article4();
  await article5();

  await connection.close();
}

// #### Users

// - Create 2 users per department (a, b, c)
// async function example1() {
//   try {
//     const deps = ['a', 'a', 'b', 'b', 'c', 'c'];
//     const users = deps.map(department => mapUser({department}));

//     const res = await userCollection.insertMany(users);
//     console.log('res', res);
//   } catch (err) {
//     console.error(err);
//   }
// }

// - Delete 1 user from department (a)

// async function example2() {
//   try {
//     const res = await userCollection.deleteOne({department: 'a'});
//     console.log('res', res);
//   } catch (err) {
//     console.error(err);
//   }
// }

// // - Update firstName for users from department (b)

// async function example3() {
//   try {
//     const usersB = await userCollection.find({department: 'b'}).toArray();
//     const bulkWrite = usersB.map(user => ({
//       updateOne: {
//         filter: {_id: user._id},
//         update: {$set: {firstName: getRandomFirstName()}}
//       }
//     }));
//     const {result} = await userCollection.bulkWrite(bulkWrite);
//     console.log(`Update ${result.nModified} users`);
//   } catch (err) {
//     console.error(err);
//   }
// }

// // - Find all users from department (c)
// async function example4() {
//   try {
//     const usersC = await userCollection.find({department: 'c'}).toArray();
//     console.log('usersC', usersC);
//   } catch (err) {
//     console.error(err);
//   }
// }

//Articles

//Create 5 articles per each type (a, b, c)
async function article1() {
  try {
    const deps = ['a', 'b', 'c'];

    for (let i = 1; i <= 5; i++) {
      const articles = deps.map(type => mapArticle({type}));
      console.log(articles);
      const res = await articlesCollection.insertMany(articles);
      console.log('res', res);
    }
  } catch (err) {
    console.error(err);
  }
}

//Find articles with type a, and update tag list with next value [‘tag1-a’, ‘tag2-a’, ‘tag3’]
async function article2() {
  try {
    const arr = ['tag1-a', 'tag2-a', 'tag3'];
    const articlesA = await articlesCollection.find({type: 'a'}).toArray();
    const bulkWrite = articlesA.map(article => ({
      updateOne: {
        filter: {_id: article._id},
        update: {$set: {tags: article.tags.concat(arr)}}
      }
    }));
    const {result} = await articlesCollection.bulkWrite(bulkWrite);
    console.log(`Update ${result.nModified} articles`);
  } catch (err) {
    console.error(err);
  }
}

//Add tags [‘tag2’, ‘tag3’, ‘super’] to other articles except articles from type a
async function article3() {
  try {
    const arr = ['tag2', 'tag3', 'super'];
    const articlesA = await articlesCollection.find({type: {$ne: 'a'}}).toArray();
    const bulkWrite = articlesA.map(article => ({
      updateOne: {
        filter: {_id: article._id},
        update: {$set: {tags: article.tags.concat(arr)}}
      }
    }));
    const {result} = await articlesCollection.bulkWrite(bulkWrite);
    console.log(`Update ${result.nModified} articles`);
  } catch (err) {
    console.error(err);
  }
}

//Find all articles that contains tags [tag2, tag1-a]

async function article4() {
  try {
    const tagsArr = ['tag2', 'tag1-a'];

    const selectedArticles = await articlesCollection.find({tags: {$in: tagsArr}}).toArray();
    console.log(selectedArticles);
  } catch (err) {
    console.error(err);
  }
}

//Pull [tag2, tag1-a] from all articles
async function article5() {
  try {
    const tagsArr = ['tag2', 'tag1-a'];

    const allArticles = await articlesCollection.find({}).toArray();
    const bulkWrite = allArticles.map(article => ({
      updateOne: {
        filter: {_id: article._id},
        update: {$pull: {tags: {$in: tagsArr}}}
      }
    }));
    const {result} = await articlesCollection.bulkWrite(bulkWrite);
    console.log(`Update ${result.nModified} articles`);
    console.log('article 5', allArticles);
  } catch (err) {
    console.error(err);
  }
}
