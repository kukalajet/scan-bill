import { createContext, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';

type ModalConfig = {
  content: React.ReactElement;
  height?: `${number}%` | number;
};

type ShowModalParams = Pick<ModalConfig, 'content'> & Partial<ModalConfig>;

type ModalContextProps = {
  config: ModalConfig | null;
  show: (value: ShowModalParams) => void;
  hide: () => void;
};

const ModalContext = createContext<ModalContextProps | null>(null);

type ModalProviderProps = PropsWithChildren;

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<ModalConfig | null>(null);

  const show = (params: ShowModalParams) => {
    setConfig(params);
  };

  const hide = () => setConfig(null);

  return (
    <ModalContext.Provider value={{ config, show, hide }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
