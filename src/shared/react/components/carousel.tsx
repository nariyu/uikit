import React, {
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {
  Carousel as NativeCarousel,
  CarouselChangeEvent,
  CarouselShowHideEvent,
} from '../../views/carousel';

// ========================================
// Carousel
// ========================================
interface CarouselProps {
  direction?: 'horizontal' | 'vertical';
  className?: string;
  itemClassName?: string;
  loop?: boolean;
  enabled?: boolean;
  itemMargin?: number;
  speedRatio?: number;
  enabledMouseWheel?: boolean;
  onChanging?: (index: number, fromIndex: number) => void;
  onChange?: (index: number, fromIndex: number) => void;
  onShow?: (index: number) => void;
  onHide?: (index: number) => void;

  children?: JSX.Element[];
}
export interface CarouselRef {
  nativeCarousel: NativeCarousel;
}
export const Carousel = forwardRef(
  (props: CarouselProps, ref: RefObject<CarouselRef>) => {
    // console.log(props);

    const elemRef = useRef<HTMLDivElement>(null);
    const [nativeCarousel, setNativeCarousel] = useState<NativeCarousel>();

    const {
      direction,
      itemMargin,
      speedRatio,
      loop,
      enabled,
      enabledMouseWheel,
      onChanging,
      onChange,
      onShow,
      onHide,
    } = props;

    useImperativeHandle(
      ref,
      () => ({
        nativeCarousel: nativeCarousel as NativeCarousel,
      }),
      [nativeCarousel],
    );

    useEffect(() => {
      const elem = elemRef.current as HTMLDivElement;
      const carousel = new NativeCarousel(elem, { loop });
      carousel.updateSize();

      if (typeof direction !== 'undefined') carousel.direction = direction;

      if (enabled !== undefined) {
        carousel.enabled = enabled;
      }
      if (itemMargin !== undefined) {
        if (carousel.itemMargin !== itemMargin) {
          carousel.itemMargin = itemMargin;
          carousel.updateSize();
        }
      }
      if (speedRatio !== undefined) {
        carousel.speedRatio = speedRatio;
      }
      if (enabledMouseWheel !== undefined) {
        carousel.enabledMouseWheel = enabledMouseWheel;
      }
      setNativeCarousel(carousel);
    }, []);

    useEffect(() => {
      if (!nativeCarousel) return;

      const changingHandler = (e: CarouselChangeEvent) => {
        if (onChanging) onChanging(e.index, e.fromIndex);
      };
      const changeHandler = (e: CarouselChangeEvent) => {
        if (onChange) onChange(e.index, e.fromIndex);
      };
      const showHamndler = (e: CarouselShowHideEvent) => {
        if (onShow) onShow(e.index);
      };
      const hideHandler = (e: CarouselShowHideEvent) => {
        if (onHide) onHide(e.index);
      };

      nativeCarousel.on('changing', changingHandler);
      nativeCarousel.on('change', changeHandler);
      nativeCarousel.on('show', showHamndler);
      nativeCarousel.on('hide', hideHandler);

      return () => {
        nativeCarousel.off('changing', changingHandler);
        nativeCarousel.off('change', changeHandler);
        nativeCarousel.off('show', showHamndler);
        nativeCarousel.off('hide', hideHandler);
      };
    }, [nativeCarousel, onChanging, onChange, onShow, onHide]);

    useEffect(() => {
      if (nativeCarousel) {
        nativeCarousel.updateSize();

        if (props.enabled !== undefined) {
          nativeCarousel.enabled = props.enabled;
        }
        if (props.enabledMouseWheel !== undefined) {
          nativeCarousel.enabledMouseWheel = props.enabledMouseWheel;
        }
        // if (currProps.itemMargin != undefined) {
        //   if (carousel.itemMargin != currProps.itemMargin) {
        //     carousel.itemMargin = currProps.itemMargin;
        //     carousel.setSize(currProps.width, currProps.height);
        //   }
        // }
        // if (currProps.speedRatio != undefined) {
        //   carousel.speedRatio = currProps.speedRatio;
        // }
      }
    }, [props.enabled, props.enabledMouseWheel]);

    useEffect(() => {
      if (nativeCarousel) {
        nativeCarousel.updateSize();
      }
    }, [nativeCarousel, props.children ? props.children.length : -1]);

    return (
      <div ref={elemRef} className={props.className} data-carousel={true}>
        <div data-carousel-scroller={true}>
          {React.Children.map(props.children, (child, index) => {
            switch (typeof child) {
              case 'object':
                return (
                  <div
                    key={index}
                    className={props.itemClassName}
                    data-carousel-item={true}
                    data-index={index}
                  >
                    {child}
                  </div>
                );

              default:
                console.log(child);
                return null;
            }
          })?.filter((item) => !!item)}
        </div>
      </div>
    );
  },
);
