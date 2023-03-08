const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');
const casual = require('casual');
dotenv.config();

const doc = {
  info: {
    title: 'Collaborator',
    description: 'Swagger Collaborator API'
  },
  host: 'localhost:3001',
  schemes: ['http', 'https'],
  definitions: {
    Post: {
      $authorId: casual.uuid,
      $postDate: casual.date(),
      $postCaption: casual.short_description,
      $postLikeCounts: Math.floor(casual.random * 10),
      $postComments: [casual.short_description]
    },
    Project: {
      $projectName: casual.short_description,
      $projectLink: casual.email,
      $projectAutherId: casual.uuid,
      $projectLikesCount: Math.floor(casual.random * 100),
      $projectStartDate: casual.date(),
      $projectDescription: casual.description,
      $isProjectFinished: casual.boolean
    },
    Skill: {
      $skillName: casual.language_code,
      $skillLevel: Math.floor(casual.random * 5),
      $skillDescription: casual.short_description
    },
    User: {
      $userEmail: casual.email,
      $userFirstName: casual.first_name,
      userLastName: casual.last_name,
      userBirthday: casual.date(),
      userPhone: casual.phone,
      userStory: casual.description,
      userAvatar: casual.short_description,
      $password: casual.password,
      $userProjectCount: Math.floor(casual.random * 10),
      $acorns: Math.floor(casual.random * 10),
      $userLevel: 1
    },
    Connection: {
      senderId: casual.uuid,
      receiverId: casual.uuid,
      accepted: casual.boolean,
      userIds: [casual.uuid, casual.uuid]
    },
    Password: {
      $userId: casual.uuid,
      $hash: casual.password
    },
    Err: { err: 'Something is wrong....' }
  }
};

const outputFile = '../swagger.json';
const endpointsFiles = ['../routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
