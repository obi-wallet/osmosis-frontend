import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export const ObiModalContext = createContext<{
  currentAddress: string | null;

  openModal(): void;
  closeModal(): void;
  signAndBroadcastTransaction(messages: unknown[]): Promise<unknown>;
}>(null!);

export function useObiModal() {
  return useContext(ObiModalContext);
}

export function ObiModalProvider({ children }: { children: ReactNode }) {
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [obiModalOpen, setObiModalOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const resolveRef = useRef<((value: unknown) => void) | null>(null);

  useEffect(() => {
    function listener(event: MessageEvent) {
      switch (event.data?.type) {
        case "@obi/close":
          setObiModalOpen(false);
          break;
        case "@obi/sign-and-broadcast-transaction-response":
          resolveRef.current?.(event.data.payload);
          resolveRef.current = null;
          setObiModalOpen(false);
          break;
        case "@obi/current-wallet":
          setCurrentAddress(event.data.address);
          break;
      }
    }
    window.addEventListener("message", listener, false);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);

  const iframeUrl = 'https://obi-wallet-modal-web-git-feature-modal-obi-money.vercel.app/osmosis';

  return (
    <ObiModalContext.Provider
      value={{
        currentAddress,
        openModal() {
          setObiModalOpen(true);
        },
        closeModal() {
          setObiModalOpen(false);
        },
        async signAndBroadcastTransaction(messages) {
          return await new Promise((resolve) => {
            setObiModalOpen(true);
            resolveRef.current = resolve;
            iframeRef.current?.contentWindow?.postMessage(
              {
                type: "@obi/sign-and-broadcast-transaction",
                payload: messages,
              },
              "*"
            );
          });
        },
      }}
    >
      {children}
      <div
        style={
          obiModalOpen
            ? {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                position: "fixed",
                width: "100vw",
                height: "100vh",
                zIndex: 900,
                left: 0,
                top: 0,
              }
            : undefined
        }
      />
      <iframe
        src={iframeUrl}
        allow="clipboard-write"
        style={{
          position: "fixed",
          width: "390px",
          height: "844px",
          zIndex: 99999,
          top: "50%",
          left: "50%",
          marginLeft: "-195px",
          marginTop: "-422px",
          visibility: obiModalOpen ? "visible" : "hidden",
        }}
        ref={iframeRef}
      />
    </ObiModalContext.Provider>
  );
}
