import { createContext, useContext } from 'react';
import { UIElementProps } from '@terra-money/apps/components';
import classNames from 'classnames';
import { forwardRef, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './ScrollableContainer.module.sass';

interface StickyHeaderProps extends UIElementProps {
  visible: boolean;
}

export const StickyHeader = (props: StickyHeaderProps) => {
  const { className, visible, children } = props;

  return (
    <TransitionGroup component={null}>
      {visible && (
        <CSSTransition
          className={classNames(className, styles.stickyHeader)}
          classNames={{
            enter: styles.transitionEnter,
            enterActive: styles.transitionEnterActive,
            exit: styles.transitionExit,
            exitActive: styles.transitionExitActive,
          }}
          in={true}
          mountOnEnter={true}
          unmountOnExit={true}
          timeout={{ enter: 400, exit: 400 }}
        >
          <div>{children}</div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

interface Scrollable extends Pick<Element, 'scrollTo'> {}

const ScrollableContext = createContext<Scrollable | null>(null);

export const useScrollableContext = () => {
  return useContext(ScrollableContext);
};

interface ScrollableContainerProps extends UIElementProps {
  stickyRef?: RefObject<HTMLElement>;
  threshold?: number;
  header?: (sticky: boolean) => ReactNode;
  onHeaderVisibilityChange?: (visible: boolean) => void;
  containerClassName?: string;
}

export const ScrollableContainer = forwardRef<HTMLDivElement, ScrollableContainerProps>((props, ref) => {
  const {
    className,
    containerClassName,
    threshold = 0.99,
    header,
    onHeaderVisibilityChange,
    children,
    stickyRef,
  } = props;

  const scrollableRef = useRef<HTMLDivElement>(null);

  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    onHeaderVisibilityChange && onHeaderVisibilityChange(headerVisible);
  }, [headerVisible]);

  useEffect(() => {
    if (stickyRef?.current) {
      const element = stickyRef.current;
      const observer = new IntersectionObserver(
        ([entry]) => {
          setHeaderVisible(entry.isIntersecting === false);
        },
        { threshold: [threshold] }
      );
      observer.observe(element);
      return () => {
        observer.unobserve(element);
        observer.disconnect();
      };
    }
  }, [stickyRef, threshold]);

  return (
    <ScrollableContext.Provider value={scrollableRef.current}>
      <div ref={ref} className={classNames(className, styles.root)}>
        {header && header(headerVisible)}
        <div ref={scrollableRef} className={classNames(containerClassName, styles.scrollableContainer)}>
          {children}
        </div>
      </div>
    </ScrollableContext.Provider>
  );
});
