import { useEffect, useState } from "react";

export function ObiModal() {
  const [obiModalOpen, setObiModalOpen] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-expect-error
      window["toggleObiModal"] = () => {
        setObiModalOpen((v) => !v);
      };
      // @ts-expect-error
      window["openObiModal"] = () => {
        setObiModalOpen(true);
      };
    }
  });

  return (
    <>
      <iframe
        src="https://obi-wallet-internal-git-feature-modal-obi-money.vercel.app/iframe.html?id=modal--primary&viewMode=story"
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
      />
      <button
        onClick={() => {
          setObiModalOpen(false);
        }}
        style={{
          position: "fixed",
          zIndex: 99999,
          top: "50%",
          left: "50%",
          marginLeft: "195px",
          marginTop: "-422px",
          visibility: obiModalOpen ? "visible" : "hidden",
        }}
      >
        X
      </button>
    </>
  );
}
