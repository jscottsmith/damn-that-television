import React from 'react';
import { RichText } from 'prismic-reactjs';
import { Badge } from 'components/badge';

export const ResumeAwards = (props) => {
  return (
    <section>
      <div className="prose">
        <RichText render={props.primary.title} />
      </div>
      <ul>
        {props.items.map((item, i) => (
          <li key={i} className="mb-md">
            <div className="text-xl font-regular italic">
              <RichText render={item.title} />
            </div>
            <Badge background="bg-peach">{item.dates}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};
