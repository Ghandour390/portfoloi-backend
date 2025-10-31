import { Request } from 'express';
// jwt types not used directly here

import { UserService } from '../modules/user/service/user.service';
import { SocialNetworkService } from '../modules/social/service/social.service';
import { CompetenceService } from '../modules/competence/service/competence.service';
import { ExperienceService } from '../modules/experience/service/experience.service';
import { DocumentService } from '../modules/document/service/document.service';
import { FormationService } from '../modules/formation/service/formation.service';

export interface IContext {
  req: Request;
  user?: IUser | null;
  services: {
    userService: UserService;
    socialNetworkService: SocialNetworkService;
    competenceService: CompetenceService;
    experienceService: ExperienceService;
    formationService: FormationService;
    documentService: DocumentService;
  };
}

export interface IUser {
  id: string;
  email: string;
  role: string;
}

export interface IAuthPayload {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}