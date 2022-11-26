import { Timestamp } from "types";
import { EventPK, Event, EventStore } from "./types";

export const fetchByTime = async <InputEvent extends Event, Output>(
  eventStore: EventStore,
  eventPk: EventPK,
  from: Timestamp,
  to: Timestamp,
  mapper: (event: InputEvent) => Array<Output>
): Promise<Array<Output>> => {
  let output = new Array<Output>();

  let response = await eventStore.getBetweenTimeRange<InputEvent>(
    eventPk,
    from,
    to
  );

  output = [...response.events.flatMap(mapper)];

  while (response.next) {
    response = await eventStore.getBetweenTimeRange<InputEvent>(
      eventPk,
      from,
      to,
      {
        next: response.next,
      }
    );
    output = [...output, ...response.events.flatMap(mapper)];
  }

  return output;
};
