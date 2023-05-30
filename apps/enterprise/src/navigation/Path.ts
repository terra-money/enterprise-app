export enum Path {
  Landing = '/',
  Dashboard = '/dashboard',
  Daos = '/daos',
  CreateDao = '/dao/create',
}

export const getDaoPath = (address: string) => `/dao/${address}`;
