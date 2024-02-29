export interface carddata {
    ID: number |string;
    Title: string;
    Content: {
      section: string;
      text: string;
    }[];
    Author: string;
    Date: number;
  }
  