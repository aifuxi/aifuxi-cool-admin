import { SVGProps } from 'react';

export const IconUserRoundedBoldDuotone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <g fill="currentColor">
      <circle cx={12} cy={6} r={4} />
      <ellipse cx={12} cy={17} opacity={0.5} rx={7} ry={4} />
    </g>
  </svg>
);
