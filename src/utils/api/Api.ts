import { TApiData } from '../../types/TApiData';
import axios from 'axios';
import { TContactInfo, TApiCheckNumber } from '../../types/TContactInfo';

export default class Api {
  host: string;
  id: string;
  token: string;

  constructor({ host, idInstance, apiTokenInstance }: TApiData) {
    this.host = host;
    this.id = idInstance;
    this.token = apiTokenInstance;
  }

  getContact(number: string): Promise<TContactInfo> {
    return axios
      .post(`${this.host}/waInstance${this.id}/GetContactInfo/${this.token}`, {
        chatId: `${number}@c.us`,
      })
      .then(({ data }) => data);
  }

  checkNumber(number: string): Promise<TApiCheckNumber> {
    return axios
      .post(`${this.host}/waInstance${this.id}/checkWhatsapp/${this.token}`, {
        phoneNumber: number,
      })
      .then(({ data }) => data);
  }
}
