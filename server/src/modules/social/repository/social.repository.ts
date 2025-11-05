import { ISocialNetwork, SocialNetworkModel } from '../model/social.model';
import { ISocialNetworkRepository } from './social.repository.interface';
import { Types } from 'mongoose';

export class SocialNetworkRepository implements ISocialNetworkRepository {
  async findById(id: string): Promise<ISocialNetwork | null> {
    return SocialNetworkModel.findById(id);
  }

  async findByUserId(userId: string): Promise<ISocialNetwork[]> {
    return SocialNetworkModel.find({ userId: new Types.ObjectId(userId) });
  }

  async create(data: Partial<ISocialNetwork>): Promise<ISocialNetwork> {
    const socialNetwork = new SocialNetworkModel(data);
    return socialNetwork.save();
  }

  async update(id: string, data: Partial<ISocialNetwork>): Promise<ISocialNetwork | null> {
    return SocialNetworkModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await SocialNetworkModel.findByIdAndDelete(id);
    return !!result;
  }
}