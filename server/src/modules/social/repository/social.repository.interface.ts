import { ISocialNetwork } from '../model/social.model';

export interface ISocialNetworkRepository {
  findById(id: string): Promise<ISocialNetwork | null>;
  findByUserId(userId: string): Promise<ISocialNetwork[]>;
  create(data: Partial<ISocialNetwork>): Promise<ISocialNetwork>;
  update(id: string, data: Partial<ISocialNetwork>): Promise<ISocialNetwork | null>;
  delete(id: string): Promise<boolean>;
}