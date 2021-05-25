import { Ease, Tween } from 'lib/tween/tween';
import { useEffect, useState } from 'react';

interface Props {
  count: number;
  transform?: (count: number) => number | string;
}
export const AnimationCounter = (props: Props) => {
  const { count, transform } = props;

  const [displayCount, setDisplayCount] = useState(count);

  useEffect(() => {
    let tween: Tween | undefined;

    if (displayCount < count) {
      const data = { c: displayCount };

      tween = new Tween(data)
        .to({ c: count }, Math.min(1000), Ease.expoOut)
        .onUpdate(({ c }) => {
          setDisplayCount(Math.floor(c));
        });
    }

    return () => {
      if (tween) {
        tween.stop();
      }
    };
  }, [count]);

  return <>{transform ? transform(displayCount) : displayCount}</>;
};
