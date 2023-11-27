import React from 'react';
import { RichText } from 'prismic-reactjs';

export const ResumeList = (props) => {
  return (
    <section>
      <div className="prose">
        <RichText render={props.primary.title} />
        <RichText render={props.primary.content} />
      </div>
      <ul className="sm:grid grid-cols-2 gap-x-sm md:grid-cols-3">
        {props.items.map((item, i) => (
          <li key={i} className="text-lunar">
            <RichText render={item.content} />
          </li>
        ))}
      </ul>
    </section>
  );
};
