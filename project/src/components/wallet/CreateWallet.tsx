import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { KeyRound, Copy, Eye, EyeOff } from "lucide-react";

interface CreateWalletProps {
  onCreateWallet: () => void;
  seedPhrase?: string;
}

export function CreateWallet({ onCreateWallet, seedPhrase }: CreateWalletProps) {
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleCopySeedPhrase = () => {
    if (seedPhrase) {
      navigator.clipboard.writeText(seedPhrase);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="w-5 h-5" />
          Create New Wallet
        </CardTitle>
        <CardDescription>
          Secure your wallet with a seed phrase
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {seedPhrase ? (
          <>
            <Alert variant="destructive">
              <AlertDescription>
                Write down your seed phrase and store it in a secure location. You'll need it to recover your wallet.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <Label>Seed Phrase</Label>
              <div className="relative">
                <Input
                  type={showSeedPhrase ? "text" : "password"}
                  value={seedPhrase}
                  readOnly
                  className="pr-20 font-mono"
                />
                <div className="absolute right-2 top-2 flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                  >
                    {showSeedPhrase ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopySeedPhrase}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="confirm"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="confirm">
                I have saved my seed phrase securely
              </Label>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground">
              Create a new wallet to start using the application
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={onCreateWallet}
          disabled={seedPhrase && !confirmed}
        >
          {seedPhrase ? "Access Wallet" : "Create Wallet"}
        </Button>
      </CardFooter>
    </Card>
  );
}