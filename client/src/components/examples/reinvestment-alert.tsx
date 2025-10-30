import { ReinvestmentAlert } from "../reinvestment-alert";

export default function ReinvestmentAlertExample() {
  return (
    <div className="p-6 max-w-3xl">
      <ReinvestmentAlert
        assetName="Kenya Solar Project"
        currentValue="$18,750"
        gainAmount="+$3,750"
        gainPercentage="+25%"
        targetReached="Target: +20%"
        suggestedAsset="Ethiopia Infrastructure Fund"
        suggestedCountry="Ethiopia"
        suggestedFlag="🇪🇹"
      />
    </div>
  );
}
