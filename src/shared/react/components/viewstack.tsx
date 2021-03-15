import React, {
  Children,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';

interface Props {
  name?: string;
  index?: number;
  className?: string;
  children?: ReactNode;
}

/**
 * (WIP)
 * @param props
 */
export function ViewStack(props: Props) {
  const initialProps: Props = {
    className: 'viewstack',
  };

  props = {
    ...initialProps,
    ...props,
  };

  return (
    <div className={props.className}>
      {props.children
        ? Children.map(props.children, (child, index) => {
            if (typeof child === 'undefined' || child == null) {
              return null;
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value = child as any;
            if (value.type === View) {
              const elem = child as ReactElement<
                ViewProps & { children?: React.ReactNode }
              >;

              const elemProps = elem.props;
              console.log(elemProps);
              elemProps.selected = elemProps.name === props.name;

              return <View key={index} {...elemProps} />;
            } else {
              const elemProps: ViewProps = {
                ...props,
              };
              elemProps.selected = elemProps.name === props.name;

              return (
                <View key={index} {...elemProps}>
                  {child}
                </View>
              );
            }
          })
        : null}
    </div>
  );
}

interface ViewProps {
  name?: string;
  className?: string;
  selected?: boolean;
}
export function View(props: PropsWithChildren<ViewProps>) {
  const initialProps: Props = {
    className: 'viewstack-view',
  };

  props = {
    ...initialProps,
    ...props,
  };

  return <div className={props.className}>{props.children}</div>;
}
