export type Call = {
  id: string;
  date: string;
  direction: string;
  time: string;
  duration: string;
  description: string;
};

export interface Contact {
  id: string;
  name: string;
  phone: string;
  favorite: boolean;
  priority: boolean;
  calls?: Call[];
}

export interface ContactWithCalls extends Contact {
  calls: Call[];
}
