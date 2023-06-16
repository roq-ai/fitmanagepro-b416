import axios from 'axios';
import queryString from 'query-string';
import { ReceptionistInterface, ReceptionistGetQueryInterface } from 'interfaces/receptionist';
import { GetQueryInterface } from '../../interfaces';

export const getReceptionists = async (query?: ReceptionistGetQueryInterface) => {
  const response = await axios.get(`/api/receptionists${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createReceptionist = async (receptionist: ReceptionistInterface) => {
  const response = await axios.post('/api/receptionists', receptionist);
  return response.data;
};

export const updateReceptionistById = async (id: string, receptionist: ReceptionistInterface) => {
  const response = await axios.put(`/api/receptionists/${id}`, receptionist);
  return response.data;
};

export const getReceptionistById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/receptionists/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteReceptionistById = async (id: string) => {
  const response = await axios.delete(`/api/receptionists/${id}`);
  return response.data;
};
