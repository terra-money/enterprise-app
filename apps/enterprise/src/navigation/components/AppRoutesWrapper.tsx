import { Navigation } from "components/Navigation"
import { BetaGuard } from "components/beta-guard"
import { InitizalizedWalletOnly } from "components/conditional-wallet/InitializedWalletOnly"

export const AppRoutesWrapper = () => {
  return (
    <InitizalizedWalletOnly>
      <BetaGuard>
        <Navigation />
      </BetaGuard>
    </InitizalizedWalletOnly>
  )
}