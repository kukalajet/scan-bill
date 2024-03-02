/* eslint-disable @typescript-eslint/no-unused-vars */

type Bill = {
  iic: string;
  tin: string;
  crtd: string;
  prc: string;
  origin: string;
};

type BillingSession = {
  total: string;
  bills: Bill[];
  id: string;
  date: string;
};
