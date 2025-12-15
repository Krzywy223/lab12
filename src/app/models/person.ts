export interface Person {
  id?: number;
  firstName?: string;
  familyName?: string;
  age?: number;

  address: {
    city?: string;
    street?: string;
    postCode?: string;
  };
}
