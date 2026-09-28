import { Badge } from '@workspace/ui/components/badge';
import { formatterYear, parseResumeDate } from '../../helpers/format-date';

type Props = {
  startDate?: string | null;
  endDate?: string | null;
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
          {props.dateFormatter.format(parseResumeDate(props.startDate))}
          {(!!props.endDate || !!props.presentRole) && ' – '}
        </span>
      )}
      {props.endDate && (
        <span>
          {props.dateFormatter.format(parseResumeDate(props.endDate))}
        </span>
      )}
      {props.presentRole && <span>Present</span>}
    </Badge>
  );
};
