import React, { PropTypes } from 'react';

export default function Copy(props) {
    const Tag = props.tag;
    const text = props.children;

    if (typeof props.children !== 'string') {
        new Error('Copy child must be a simple string');
    }

    const textarray = text.split(' ');
    const lastWord = textarray.length - props.orphans;
    const joinedText = textarray.slice(0, lastWord).join(' ') + ' ' + textarray.slice(lastWord).join('&nbsp;');

    function renderText() {
        return { __html: joinedText };
    }

    return (
        <Tag className="copy-html" dangerouslySetInnerHTML={renderText()} />
    );
}

Copy.propTypes = {
    children: PropTypes.string.isRequired,
    orphans: PropTypes.number.isRequired,
    tag: PropTypes.string.isRequired,
};

Copy.defaultProps = {
    orphans: 2, // Default to two words
    tag: 'span',
    children: '',
};
