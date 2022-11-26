import { useCallback, useState } from "react";

export type CarouselDirection = "left" | "right";

type CarouselNavigation = {
  indicies: Array<number>;
  direction: CarouselDirection;
  transitionLeft: () => void;
  transitionRight: () => void;
};

export const useCarouselNavigation = (length: number): CarouselNavigation => {
  const [transition, setTransition] = useState<
    Pick<CarouselNavigation, "indicies" | "direction">
  >({
    indicies: Array.from(Array(length).keys()),
    direction: "left",
  });

  const transitionLeft = useCallback(() => {
    setTransition((transition) => {
      return {
        indicies: [...transition.indicies.slice(1), transition.indicies[0]],
        direction: "left",
      };
    });
  }, [setTransition]);

  const transitionRight = useCallback(() => {
    setTransition((transition) => {
      return {
        indicies: [
          transition.indicies[transition.indicies.length - 1],
          ...transition.indicies.slice(0, -1),
        ],
        direction: "right",
      };
    });
  }, [setTransition]);

  return {
    ...transition,
    transitionLeft,
    transitionRight,
  };
};
