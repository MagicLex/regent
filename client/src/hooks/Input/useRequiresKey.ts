import { useChatContext } from '~/Providers/ChatContext';
import { useGetEndpointsQuery } from '~/data-provider';
import { getEndpointField } from '~/utils';
import useUserKey from './useUserKey';

export default function useRequiresKey() {
  // Demo mode - always return that no key is required
  return { requiresKey: false };
  
  /* Original logic disabled for demo
  const { conversation } = useChatContext();
  const { data: endpointsConfig } = useGetEndpointsQuery();
  const { endpoint } = conversation || {};
  const userProvidesKey: boolean | null | undefined = getEndpointField(
    endpointsConfig,
    endpoint,
    'userProvide',
  );
  const { getExpiry } = useUserKey(endpoint ?? '');
  const expiryTime = getExpiry();
  const requiresKey = !expiryTime && userProvidesKey;
  return { requiresKey };
  */
}
