import { create } from 'zustand';

import * as storage from '@/storages';

type BillingSessionsStore = {
  sessions: BillingSession[];
  status: StoreFieldStatus;
  loadSessions: () => void;
  addSession: (session: BillingSession) => void;
  deleteSession: (session: BillingSession) => void;
  clear: () => void;
};

enum BillSessionsConstants {
  BILL_SESSIONS_KEY = 'bill-sessions',
}

const INITIAL_STATE: NonActionProperties<BillingSessionsStore> = {
  sessions: [],
  status: 'success',
};

const createActions: CreateActions<BillingSessionsStore> = (set, get) => ({
  loadSessions: () => loadSessions(set!, get!),
  addSession: (session) => addSession(session, set!, get!),
  deleteSession: (session) => deleteSession(session, set!, get!),
  clear: () => set!(INITIAL_STATE),
});

const loadSessions = (
  set: SetStore<BillingSessionsStore>,
  get: GetStore<BillingSessionsStore>,
) => {
  const sessions = storage.retrieve<BillingSessionsStore['sessions']>(
    BillSessionsConstants.BILL_SESSIONS_KEY,
  );
  set({ sessions });
};

const addSession = (
  session: BillingSession,
  set: SetStore<BillingSessionsStore>,
  get: GetStore<BillingSessionsStore>,
) => {
  const isSessionExisting = get().sessions.some((s) => s.id === session.id);
  const sessions = [
    ...(isSessionExisting
      ? get().sessions.filter((s) => s.id !== session.id)
      : get().sessions),
    session,
  ];
  storage.store(
    BillSessionsConstants.BILL_SESSIONS_KEY,
    JSON.stringify(sessions),
  );

  set({ sessions });
};

const deleteSession = (
  session: BillingSession,
  set: SetStore<BillingSessionsStore>,
  get: GetStore<BillingSessionsStore>,
) => {
  const sessions = get().sessions.filter((s) => s.id !== session.id);
  storage.store(
    BillSessionsConstants.BILL_SESSIONS_KEY,
    JSON.stringify(sessions),
  );

  set({ sessions });
};

const useBillingSessionsStore = create<BillingSessionsStore>((set, get) => ({
  ...INITIAL_STATE,
  ...createActions(set, get),
}));

export { useBillingSessionsStore };
