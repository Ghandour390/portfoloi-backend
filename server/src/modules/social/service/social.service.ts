import { ISocialNetwork } from '../model/social.model';
import { ISocialNetworkRepository } from '../repository/social.repository.interface';
import { AuthenticationError } from 'apollo-server-express';
import { Types } from 'mongoose';

export class SocialNetworkService {
  constructor(private readonly socialNetworkRepository: ISocialNetworkRepository) {}

  async createSocialNetwork(userId: string, data: Partial<ISocialNetwork>): Promise<ISocialNetwork> {
    return this.socialNetworkRepository.create({ ...data, userId: new Types.ObjectId(userId) });
  }

  async updateSocialNetwork(userId: string, id: string, data: Partial<ISocialNetwork>): Promise<ISocialNetwork> {
    const socialNetwork = await this.socialNetworkRepository.findById(id);
    if (!socialNetwork) {
      throw new Error('Social network not found');
    }

    if (socialNetwork.userId.toString() !== userId) {
      throw new AuthenticationError('Not authorized');
    }

    const updated = await this.socialNetworkRepository.update(id, data);
    if (!updated) {
      throw new Error('Failed to update social network');
    }

    return updated;
  }

  async deleteSocialNetwork(userId: string, id: string): Promise<boolean> {
    const socialNetwork = await this.socialNetworkRepository.findById(id);
    if (!socialNetwork) {
      throw new Error('Social network not found');
    }

    if (socialNetwork.userId.toString() !== userId) {
      throw new AuthenticationError('Not authorized');
    }

    return this.socialNetworkRepository.delete(id);
  }

  async getSocialNetworkById(id: string): Promise<ISocialNetwork> {
    const socialNetwork = await this.socialNetworkRepository.findById(id);
    if (!socialNetwork) {
      throw new Error('Social network not found');
    }
    return socialNetwork;
  }

  async getUserSocialNetworks(userId: string): Promise<ISocialNetwork[]> {
    return this.socialNetworkRepository.findByUserId(userId);
  }
}