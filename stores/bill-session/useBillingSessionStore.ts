import { create } from 'zustand';

import { formatToLekCurrency } from '@/utils/format';

type BillingSessionStore = {
  total: string;
  bills: Bill[];
  addBillFromUrl: (url: string) => void;
  clear: () => void;
  deleteBill: (bill: Bill) => void;
};

const INITIAL_STATE: NonActionProperties<BillingSessionStore> = {
  total: '0',
  bills: [],
};

const createActions: CreateActions<BillingSessionStore> = (set, get) => ({
  addBillFromUrl: (url) => addBillFromUrl(url, set!, get!),
  clear: () => set!(INITIAL_STATE),
  deleteBill: (bill) => deleteBill(bill, set!, get!),
});

const addBillFromUrl = (
  url: string,
  set: SetStore<BillingSessionStore>,
  get: GetStore<BillingSessionStore>,
) => {
  const { iic, tin, crtd, prc } = extractParamsFromUrl(url);
  const bill = { iic, tin, crtd, prc, origin: url };
  const allBills = get().bills;

  const isBillDuplicated = allBills.some((b) => b.origin === url);
  if (isBillDuplicated) return;

  const bills = [...allBills, bill];
  const total = calculateTotal(bills);

  set({ bills, total });
};

const deleteBill = (
  bill: Bill,
  set: SetStore<BillingSessionStore>,
  get: GetStore<BillingSessionStore>,
) => {
  const allBills = get().bills;
  const bills = allBills.filter((b) => b.origin !== bill.origin);
  const total = calculateTotal(bills);

  set({ bills, total });
};

const extractParamsFromUrl = (url: string) => {
  const params = new URLSearchParams(url);

  return {
    iic: params.get('iic')!,
    tin: params.get('tin')!,
    crtd: params.get('crtd')!,
    prc: params.get('prc')!,
  };
};

const calculateTotal = (bills: Bill[]): string => {
  const value = bills.reduce((acc, bill) => acc + parseFloat(bill.prc), 0);
  const total = formatToLekCurrency(value);

  return total;
};

const useBillingSessionStore = create<BillingSessionStore>((set, get) => ({
  ...INITIAL_STATE,
  ...createActions(set, get),
}));

export { useBillingSessionStore };
