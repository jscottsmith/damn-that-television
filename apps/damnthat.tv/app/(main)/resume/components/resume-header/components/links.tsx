import { Prose } from '@/components/typography/prose';
import { PrismicRichText } from '@prismicio/react';
import React from 'react';
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

export const Links = (props) => {
  return (
    <Prose>
      <PrismicRichText field={props.links.primary.title} />
      <ul>
        {props.links.items.map((item, i) => {
          const IconComponent = getIconForLinkType(item.type);
          return (
            <li key={i} className="flex list-none items-center gap-2">
              <IconComponent className="inline-block h-4 w-4 text-slate-500" />
              <a href={item.link.url}>{item.label}</a>
            </li>
          );
        })}
      </ul>
    </Prose>
  );
};
