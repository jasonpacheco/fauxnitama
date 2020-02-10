import React from 'react';
import { GutterWrapper, Stamp, StampTooltip } from './styles/Gutter';

interface GutterProps {
  invert: boolean;
  stampColor: 'Blue' | 'Red';
}

const Gutter: React.FC<GutterProps> = ({ stampColor, invert }) => {
  return (
    <GutterWrapper>
      <Stamp color={stampColor}>
        <StampTooltip invert={invert}>
          <div>
            <span>{stampColor}</span> player goes first.
          </div>
        </StampTooltip>
      </Stamp>
    </GutterWrapper>
  );
};

export default React.memo(Gutter, (prevProps, nextProps) => {
  return (
    prevProps.stampColor === nextProps.stampColor &&
    prevProps.invert === nextProps.invert
  );
});
