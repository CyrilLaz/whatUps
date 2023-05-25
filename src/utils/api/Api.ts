import { TApiData } from '../../types/TApiData';
import axios from 'axios';
import { TContactInfo, TApiCheckNumber } from '../../types/TContactInfo';
import { TReceiveNoteMessageExtText, TReceiveNoteMessageText, TResponseDeleteNotification, TSendMessage, TSendMessageAnswer } from '../../types/TMessage';

const id = process.env.REACT_APP_ID_INSTANCE!;
const token = process.env.REACT_APP_API_TOKEN_INSTANCE!;
const host = process.env.REACT_APP_HOST!;

class Api {
  host: string;
  id: string;
  token: string;

  constructor({ host, idInstance, apiTokenInstance }: TApiData) {
    this.host = host;
    this.id = idInstance;
    this.token = apiTokenInstance;
  }

  _urlRequest(a: string) {
    return `${this.host}/waInstance${this.id}/${a}/${this.token}`
  }

  getContact(number: string): Promise<TContactInfo> {
    return axios
      .post(this._urlRequest('GetContactInfo'), {
        chatId: `${number}@c.us`,
      })
      .then(({ data }) => data);
  }

  checkNumber(number: string): Promise<TApiCheckNumber> {
    return axios
      .post(this._urlRequest('checkWhatsapp'), {
        phoneNumber: number,
      })
      .then(({ data }) => data);
  }

  sendMessage({ chatId, message }: TSendMessage): Promise<TSendMessageAnswer> {
    return axios.post(this._urlRequest('sendMessage'), { chatId, message }).then(({ data }) => data);
  }

  receiveNotification(): Promise<|TReceiveNoteMessageText|TReceiveNoteMessageExtText| null>{
    return axios.get(this._urlRequest('receiveNotification')).then(({ data }) => data);
  }

  deleteNotification(id: number):Promise<TResponseDeleteNotification> {
    return axios.delete(`${this._urlRequest('deleteNotification')}/${id}`).then(({ data }) => data);
  }
}

export const api = new Api({ host, idInstance: id, apiTokenInstance: token });
