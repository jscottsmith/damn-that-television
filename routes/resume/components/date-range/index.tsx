import { Badge } from 'components/badge';
import React from 'react';
import { formatterYear } from '../../helpers/format-date';

type Props = {
  startDate: string;
  endDate?: string;
  presentRole?: boolean;
  dateFormatter: {
    format: (date: Date) => ReturnType<typeof formatterYear.format>;
  };
};

export const DateRange = (props: Props) => {
  return (
    <Badge className="mt-1" background="bg-peach">
      {props.startDate && (
        <span>
          {props.dateFormatter.format(new Date(props.startDate))}
          {(!!props.endDate || !!props.presentRole) && ' – '}
        </span>
      )}
      {props.endDate && (
        <span>{props.dateFormatter.format(new Date(props.endDate))}</span>
      )}
      {props.presentRole && <span>Present</span>}
    </Badge>
  );
};
