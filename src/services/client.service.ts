import { ClientModel } from '@/models';

const clients: Array<ClientModel> = [
  {
    _id: 1,
    name: 'Test Client',
    address1: '124 Test St',
    city: 'Roseville',
    state: 'MI',
    zip: '48066',
    country: 'US',
    phone: '+12488225822',
    email: 'test@aroconnection.com',
  },
  {
    _id: 2,
    name: 'Second Test Client',
    address1: '124 Test St',
    city: 'Roseville',
    state: 'MI',
    zip: '48066',
    country: 'US',
    phone: '+12488225822',
    email: 'test@aroconnection.com',
  },
];

class ClientService {
  public static getAllClients(): Array<ClientModel> {
    return clients;
  }

  public static getClientById(clientId: number): ClientModel | undefined {
    const client = clients.find((client) => client._id === clientId);

    return client;
  }
}

const ClientServiceInstance: ClientService = new ClientService();

export default ClientServiceInstance;
