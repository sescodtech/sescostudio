export interface BusEvent {
  type: 'save_failed' | 'upload_failed' | 'maintenance_on' | 'maintenance_off';
  message: string;
}

type Listener = (e: BusEvent) => void;
const listeners = new Set<Listener>();

export function emitNotification(event: BusEvent) {
  listeners.forEach(l => l(event));
}
export function subscribeNotifications(listener: Listener) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
