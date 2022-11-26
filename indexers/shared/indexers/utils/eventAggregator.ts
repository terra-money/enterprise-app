import { fetchByTime, fetchByHeight } from "services/event-store";
import { Timestamp } from "types";
import { Event, EventPK, EventStore } from "../../services/event-store/types";

interface EventAggregate {
  timestamp: number;
  value: string;
}

export const eventAggregator = async <TEvent extends Event, TOutput = number>(
  eventStore: EventStore,
  eventPK: EventPK,
  minHeight: number,
  maxHeight: number,
  valueReducer: (events: TEvent[]) => TOutput
): Promise<Array<EventAggregate>> => {
  // determine the modified timestamps base on what events have been raised
  const timestamps = await fetchByHeight<TEvent, number>(
    eventStore,
    eventPK,
    minHeight,
    maxHeight,
    (event) => [new Timestamp(event.timestamp).truncate("hour").toNumber()]
  );

  const values = [];

  // for each of the timestamps that were modified we recalculate that complete
  // data set to ensure that the results are always consistent in the case
  // the indexer needs to re-run
  for (const timestamp of new Set<number>(timestamps)) {
    const events = await fetchByTime<TEvent, TEvent>(
      eventStore,
      eventPK,
      new Timestamp(timestamp),
      new Timestamp(timestamp + 3599),
      (e) => [e]
    );

    values.push({
      timestamp,
      value: valueReducer(events.flatMap((e) => e)),
    });
  }

  return values;
};
