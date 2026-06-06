import { Badge } from '@workspace/ui/components/badge';
import React from 'react';
import { formatterYear } from '../../helpers/format-date';
import type { DateField } from '@prismicio/client';

type Props = {
  startDate: DateField;
  endDate?: DateField;
  presentRole?: boolean;
  dateFormatter: {
    format: (date: Date) => ReturnType<typeof formatterYear.format>;
  };
};

export const DateRange = (props: Props) => {
  return (
    <Badge className="mt-1" variant="primary">
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
