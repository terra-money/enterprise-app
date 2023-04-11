import { InternalLink } from 'components/link';
import { IconButton, Tooltip } from 'components/primitives';
import { SettingsIcon } from 'lib/ui/icons/SettingsIcon';

export const SettingsNavigationItem = () => {
  return (
    <Tooltip title="Settings" placement="right" arrow={true} >
      <div>
        <InternalLink to="/settings">
          <IconButton variant="outline">
            <SettingsIcon />
          </IconButton>
        </InternalLink>
      </div>
    </Tooltip >
  )
}