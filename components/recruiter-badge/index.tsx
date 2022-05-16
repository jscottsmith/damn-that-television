import React from 'react';
import cx from 'classnames';

export const RecruiterBadge = (props) => {
  const { className, ...rest } = props;
  return (
    <button
      className={cx(
        props.className,
        'flex items-center justify-center group cursor-pointer',
      )}
      {...rest}
    >
      <span className="absolute inset-0 bg-cream rounded-full scale-75 md:scale-0 md:opacity-0 transition-all duration-200 ease-out group-hover:scale-75 group-hover:opacity-100 "></span>
      <span className="absolute inset-0 flex items-center justify-center">
        {props.children}
      </span>
      <svg viewBox="0 0 500 500" className="z-10">
        <title>Employers & Recruiters</title>
        <defs>
          {/* <circle id="textcircle" cx="250" cy="250" r="200" /> */}
          <path
            d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
            id="textcircle"
          >
            <animateTransform
              attributeName="transform"
              begin="0s"
              dur="60s"
              type="rotate"
              from="0 250 250"
              to="360 250 250"
              repeatCount="indefinite"
            />
          </path>
        </defs>
        <text
          dy="70"
          textLength="1220"
          className="font-normal uppercase text-deep"
        >
          <textPath xlinkHref="#textcircle" fill="currentColor">
            {'Employers & Recruiters • Employers & Recruiters • '}
          </textPath>
        </text>
      </svg>
    </button>
  );
};
