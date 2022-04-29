import { FunctionComponent } from "react";
import { CoinPretty } from "@keplr-wallet/unit";
import { ModalBase, ModalBaseProps } from "./base";
import { Button } from "../components/buttons";
import { TokenSelect } from "../components/control";
import Image from "next/image";

export const PreTransferModal: FunctionComponent<
  ModalBaseProps & {
    selectedToken: CoinPretty;
    tokens: CoinPretty[];
    externalDepositUrl?: string;
    externalWithdrawUrl?: string;
    onSelectToken: (coinDenom: string) => void;
    onWithdraw: () => void;
    onDeposit: () => void;
  }
> = (props) => {
  const {
    selectedToken,
    tokens,
    externalDepositUrl,
    externalWithdrawUrl,
    onSelectToken,
    onWithdraw,
    onDeposit,
  } = props;

  return (
    <ModalBase
      {...props}
      title={
        <TokenSelect
          selectedTokenDenom={selectedToken.denom}
          tokens={tokens}
          onSelect={(coinDenom) => onSelectToken(coinDenom)}
          sortByBalances
        />
      }
    >
      <div className="flex flex-col gap-5 pt-5">
        <div className="flex flex-col gap-2 items-center">
          <h6>{selectedToken.currency.coinDenom}</h6>
          <span className="subtitle2 text-iconDefault">
            {selectedToken.toString()}
          </span>
        </div>
        <div className="flex place-content-between gap-5 py-2">
          {externalDepositUrl ? (
            <a
              className="flex w-full gap-1 h-10 text-button font-button justify-center items-center rounded-lg bg-primary-200"
              href={externalDepositUrl}
              rel="noreferrer"
              target="_blank"
            >
              Deposit
              <Image
                alt="external transfer link"
                src="/icons/external-link-white.svg"
                height={8}
                width={8}
              />
            </a>
          ) : (
            <Button className="w-full h-10" onClick={onDeposit}>
              Deposit
            </Button>
          )}
          {externalWithdrawUrl ? (
            <a
              className="flex w-full gap-1 text-button font-button h-10 justify-center items-center rounded-lg bg-primary-200/30 border border-primary-200"
              href={externalWithdrawUrl}
              rel="noreferrer"
              target="_blank"
            >
              Withdraw
              <Image
                alt="external transfer link"
                src="/icons/external-link-white.svg"
                height={8}
                width={8}
              />
            </a>
          ) : (
            <Button
              className="w-full h-10 bg-primary-200/30"
              type="outline"
              onClick={onWithdraw}
            >
              Withdraw
            </Button>
          )}
        </div>
      </div>
    </ModalBase>
  );
};
