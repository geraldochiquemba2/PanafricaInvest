import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function WalletConnectButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = (walletType: string) => {
    console.log(`Connecting to ${walletType}...`);
    setWalletAddress("0.0.123456");
    setIsConnected(true);
  };

  if (isConnected) {
    return (
      <Button
        variant="outline"
        className="rounded-full"
        data-testid="button-wallet-connected"
      >
        <Wallet className="h-4 w-4 mr-2" />
        {walletAddress}
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="rounded-full"
          data-testid="button-connect-wallet"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md" data-testid="dialog-wallet-connect">
        <DialogHeader>
          <DialogTitle>Connect Hedera Wallet</DialogTitle>
          <DialogDescription>
            Choose your wallet to connect to Panafrica Invest
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          <Button
            variant="outline"
            className="w-full h-14 justify-start hover-elevate"
            onClick={() => connectWallet("HashPack")}
            data-testid="button-hashpack"
          >
            <Wallet className="h-5 w-5 mr-3" />
            HashPack
          </Button>
          <Button
            variant="outline"
            className="w-full h-14 justify-start hover-elevate"
            onClick={() => connectWallet("Blade")}
            data-testid="button-blade"
          >
            <Wallet className="h-5 w-5 mr-3" />
            Blade Wallet
          </Button>
          <Button
            variant="outline"
            className="w-full h-14 justify-start hover-elevate"
            onClick={() => connectWallet("Metamask")}
            data-testid="button-metamask"
          >
            <Wallet className="h-5 w-5 mr-3" />
            MetaMask (EVM)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
