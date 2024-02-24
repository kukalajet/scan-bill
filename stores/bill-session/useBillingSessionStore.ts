import { create } from 'zustand';

type BillingSessionStore = {
  bills: Bill[];
  addBillFromUrl: (url: string) => void;
  clear: () => void;
};

const INITIAL_STATE: NonActionProperties<BillingSessionStore> = {
  bills: [],
};

const createActions: CreateActions<BillingSessionStore> = (set, get) => ({
  addBillFromUrl: (url) => addBillFromUrl(url, set!, get!),
  clear: () => set!(INITIAL_STATE),
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
  set({ bills });
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

const useBillingSessionStore = create<BillingSessionStore>((set, get) => ({
  ...INITIAL_STATE,
  ...createActions(set, get),
}));

export { useBillingSessionStore };
