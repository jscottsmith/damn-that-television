import type { ResumeLinkGroup } from '../../../../../../lib/content/types';
import { Prose } from '@workspace/ui/components/typography/prose';
import {
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentIcon,
  ArrowTopRightOnSquareIcon,
  FolderIcon,
  UserIcon,
  UserPlusIcon,
  UsersIcon,
  CodeBracketIcon,
  CommandLineIcon,
} from '@heroicons/react/20/solid';

const getIconForLinkType = (type: string) => {
  switch (type) {
    case 'website':
      return GlobeAltIcon;
    case 'phone':
      return PhoneIcon;
    case 'email':
      return EnvelopeIcon;
    case 'document':
      return DocumentIcon;
    case 'external':
      return ArrowTopRightOnSquareIcon;
    case 'project':
      return FolderIcon;
    case 'user':
      return UserIcon;
    case 'user_plus':
      return UserPlusIcon;
    case 'users':
      return UsersIcon;
    case 'code':
      return CodeBracketIcon;
    case 'command':
      return CommandLineIcon;
    default:
      return GlobeAltIcon;
  }
};

export const Links = ({ group }: { group: ResumeLinkGroup }) => {
  return (
    <Prose>
      <h4>{group.title}</h4>
      <ul>
        {group.items.map((item) => {
          const IconComponent = getIconForLinkType(item.type);
          return (
            <li key={item.href} className="flex list-none items-center gap-2">
              <IconComponent className="text-muted-foreground inline-block h-4 w-4" />
              <a href={item.href}>{item.label}</a>
            </li>
          );
        })}
      </ul>
    </Prose>
  );
};
