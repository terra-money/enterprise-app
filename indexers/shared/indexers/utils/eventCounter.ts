import { Event, EventPK, EventStore } from '../../services/event-store/types';
import { eventAggregator } from './eventAggregator';

export const eventCounter = async <TEvent extends Event>(
  eventStore: EventStore,
  eventPK: EventPK,
  minHeight: number,
  maxHeight: number
) => {
  return eventAggregator<TEvent, string>(eventStore, eventPK, minHeight, maxHeight, (events) =>
    events.length.toString()
  );
};
