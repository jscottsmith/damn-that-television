import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Copy(props) {
    const Tag = props.tag;
    const text = props.children;

    if (typeof props.children !== 'string') {
        new Error('Copy child must be a simple string');
    }

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
        <Tag
            className={cx('copy-html', {
                [props.className]: props.className,
            })}
            dangerouslySetInnerHTML={renderText()}
        />
    );
}

Copy.propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    orphans: PropTypes.number.isRequired,
    tag: PropTypes.string.isRequired,
};

Copy.defaultProps = {
    children: '',
    orphans: 0,
    tag: 'span',
};
