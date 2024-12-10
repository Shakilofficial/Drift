export interface IUSer {
  name: string;
  age: number;
  email: string;
  phone: string;
  photo?: string | null;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  isDeleted?: boolean;
}
