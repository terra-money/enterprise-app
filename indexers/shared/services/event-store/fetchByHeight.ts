import { EventPK, Event, EventStore } from "./types";

export const fetchByHeight = async <InputEvent extends Event, Output>(
  eventStore: EventStore,
  eventPk: EventPK,
  min: number,
  max: number,
  mapper: (event: InputEvent) => Array<Output>
): Promise<Array<Output>> => {
  let output = new Array<Output>();

  let response = await eventStore.getBetweenBlocks<InputEvent>(
    eventPk,
    min,
    max
  );

  output = [...response.events.flatMap(mapper)];

  while (response.next) {
    response = await eventStore.getBetweenBlocks<InputEvent>(
      eventPk,
      min,
      max,
      {
        next: response.next,
      }
    );
    output = [...output, ...response.events.flatMap(mapper)];
  }

  return output;
};
