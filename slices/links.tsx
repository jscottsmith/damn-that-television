import { RichText } from 'prismic-reactjs';
import React from 'react';

export const Links = (props) => {
  return (
    <>
      <RichText render={props.links.primary.title} />
      <ul>
        {props.links.items.map((item, i) => (
          <li key={i}>
            <a href={item.link.url}>{item.label}</a>
          </li>
        ))}
      </ul>
    </>
  );
};
