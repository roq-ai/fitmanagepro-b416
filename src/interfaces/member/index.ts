import { GymInterface } from 'interfaces/gym';
import { GetQueryInterface } from 'interfaces';

export interface MemberInterface {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  gym_id?: string;
  created_at?: any;
  updated_at?: any;

  gym?: GymInterface;
  _count?: {};
}

export interface MemberGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  gym_id?: string;
}
