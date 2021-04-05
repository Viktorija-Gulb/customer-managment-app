
export interface User {
  id: number;
  fullName: string;
  email: string;
  city: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  latitude?: number,
  longitude?: number
}