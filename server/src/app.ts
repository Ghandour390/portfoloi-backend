import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
// connect to the database
import { connectDB } from './config/database';
// import typeDefs and resolvers de users
import { userTypeDefs } from './modules/user/graphql/user.typedefs';
import { userResolvers } from './modules/user/graphql/user.resolvers';
// import typeDefs and resolvers de social networks
import { socialNetworkTypeDefs } from './modules/social/graphql/social.typedefs';
import { socialNetworkResolvers } from './modules/social/graphql/social.resolvers';
// import typeDefs and resolvers de competences
import { competenceTypeDefs } from './modules/competence/graphql/competence.typedefs';
import { competenceResolvers } from './modules/competence/graphql/competence.resolvers';
// import shared auth utils
import { verifyAccessToken } from './shared/auth';
// import cors middleware
import cors from 'cors';
// import repositories and services
import { UserRepository } from './modules/user/repository/user.repository';
import { UserService } from './modules/user/service/user.service';
import { SocialNetworkRepository } from './modules/social/repository/social.repository';
import { SocialNetworkService } from './modules/social/service/social.service';
import { CompetenceRepository } from './modules/competence/repository/competence.repository';
import { CompetenceService } from './modules/competence/service/competence.service';
import { ExperienceRepository } from './modules/experience/repository/experience.repository';
import { ExperienceService } from './modules/experience/service/experience.service';
import { FormationRepository } from './modules/formation/repository/formation.repository';
import { FormationService } from './modules/formation/service/formation.service';
import { DocumentRepository } from './modules/document/repository/document.repository';
import { DocumentService } from './modules/document/service/document.service';
import { experienceTypeDefs } from './modules/experience/graphql/experience.typedefs';
import { experienceResolvers } from './modules/experience/graphql/experience.resolvers';
import { formationTypeDefs } from './modules/formation/graphql/formation.typedefs';
import { formationResolvers } from './modules/formation/graphql/formation.resolvers';
import { documentTypeDefs } from './modules/document/graphql/document.typedefs';
import { documentResolvers } from './modules/document/graphql/document.resolvers';
import { GraphQLUpload } from 'graphql-upload';

export const app = express();

app.use(cors());
// enable graphql file uploads (graphql-upload middleware)
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 }));

app.use((req, res, next) => {
  if (req.path === '/graphql') return next();
  return express.json()(req, res, next);
});


const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const socialNetworkRepository = new SocialNetworkRepository();
const socialNetworkService = new SocialNetworkService(socialNetworkRepository);

const competenceRepository = new CompetenceRepository();
const competenceService = new CompetenceService(competenceRepository);

const experienceRepository = new ExperienceRepository();
const experienceService = new ExperienceService(experienceRepository);

const formationRepository = new FormationRepository();
const formationService = new FormationService(formationRepository);

const documentRepository = new DocumentRepository();
const documentService = new DocumentService(documentRepository);

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: [
      userTypeDefs,
      socialNetworkTypeDefs,
      competenceTypeDefs,
      experienceTypeDefs,
      formationTypeDefs,
      documentTypeDefs
    ],
    resolvers: [
      { Upload: GraphQLUpload },
      userResolvers,
      socialNetworkResolvers,
      competenceResolvers,
      experienceResolvers,
      formationResolvers,
      documentResolvers
    ],
    context: ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1];
    const user = token ? verifyAccessToken(req as any) : null;
      return { 
        req, 
        user,
        services: {
          userService,
          socialNetworkService,
          competenceService,
          experienceService,
          formationService,
          documentService
        }
      };
    },
  });

  await server.start();
  // applyMiddleware typing can conflict between @types/express versions; cast `app` to any
  server.applyMiddleware({ app: app as any });

  const PORT = process.env.PORT || 4000;

  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer().catch((error) => {
  console.error('Error starting server:', error);
});