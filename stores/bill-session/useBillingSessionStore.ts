import { create } from 'zustand';

type BillingSessionStore = {
  bills: Bill[];
  addBillFromUrl: (url: string) => void;
};

const INITIAL_STATE: NonActionProperties<BillingSessionStore> = {
  bills: [],
};

const createActions: CreateActions<BillingSessionStore> = (set, get) => ({
  addBillFromUrl: (url) => {
    const bill: Bill = {
      iic: 'test',
      tin: 'test',
      crtd: 'test',
      prc: 'test',
      origin: url,
    };

    const allBills = get!().bills;
    const isBillDuplicated = allBills.some((b) => b.origin === url);
    if (isBillDuplicated) {
      console.log('skipping duplicate bill');
      return;
    }

    const bills = [...allBills, bill];
    set!({ bills });
  },
});

const useBillingSessionStore = create<BillingSessionStore>((set, get) => ({
  ...INITIAL_STATE,
  ...createActions(set, get),
}));

export { useBillingSessionStore };
