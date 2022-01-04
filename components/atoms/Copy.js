import React from 'react';
import PropTypes from 'prop-types';

export default function Copy(props) {
  const Tag = props.tag;
  const text = props.children;

  const textarray = text.split(' ');
  const lastWord = textarray.length - props.orphans;
  const joinedText =
    textarray.slice(0, lastWord).join(' ') +
    ' ' +
    textarray.slice(lastWord).join('&nbsp;');

  function renderText() {
    return { __html: joinedText };
  }

  return (
    <Tag className={props.className} dangerouslySetInnerHTML={renderText()} />
  );
}

Copy.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  orphans: PropTypes.number.isRequired,
  tag: PropTypes.string.isRequired,
};

Copy.defaultProps = {
  orphans: 2, // Default to two words
  tag: 'span',
  children: '',
};
