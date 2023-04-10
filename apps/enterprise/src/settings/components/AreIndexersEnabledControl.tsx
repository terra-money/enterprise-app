import { Switch } from 'lib/ui/Switch/Switch';
import { useAreIndexersEnabled } from 'state/hooks/useAreIndexersEnabled';

export const AreIndexersEnabledControl = () => {
  const [areIndexersEnabled, setAreIndexersEnabled] = useAreIndexersEnabled()

  return (
    <Switch value={areIndexersEnabled} onChange={setAreIndexersEnabled} label="Are indexers enabled" />
  )
}