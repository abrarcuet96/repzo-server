interface ILoggedInUser {
  id?: string;
  password: string;
  role: 'user' | 'customer';
  needsPasswordChange: boolean;
  isDeleted: boolean;
}
export default ILoggedInUser;
