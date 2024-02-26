import { create } from 'zustand';

type BillingSessionsStore = {
  sessions: BillingSession[];
  status: StoreFieldStatus;
  loadSessions: () => void;
  addSession: (session: BillingSession) => void;
  deleteSession: (session: BillingSession) => void;
  clear: () => void;
};

const INITIAL_STATE: NonActionProperties<BillingSessionsStore> = {
  sessions: [],
  status: 'initial',
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
  set({ status: 'loading' });

  setTimeout(() => {
    set({ sessions: [], status: 'success' });
  }, 1000);
};

const addSession = (
  session: BillingSession,
  set: SetStore<BillingSessionsStore>,
  get: GetStore<BillingSessionsStore>,
) => {
  const sessions = [...get().sessions, session];
  set({ sessions });
};

const deleteSession = (
  session: BillingSession,
  set: SetStore<BillingSessionsStore>,
  get: GetStore<BillingSessionsStore>,
) => {
  const sessions = get().sessions.filter((s) => s.id !== session.id);
  set({ sessions });
};

const useBillingSessionsStore = create<BillingSessionsStore>((set, get) => ({
  ...INITIAL_STATE,
  ...createActions(set, get),
}));

export { useBillingSessionsStore };
