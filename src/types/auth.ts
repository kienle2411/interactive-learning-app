export interface SignUpBody {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  school?: string;
  gender: string;
  profileDescription?: string;
  mediaId?: string;
  roleId: string;
}
