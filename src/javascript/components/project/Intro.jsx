import React, { PropTypes } from 'react';
import Copy from 'components/utility/Copy';

export default function Intro(props) {
    const { description } = props;

    return (
        <section className="project-intro">
            <Copy tag="p">{description}</Copy>
        </section>
    );
}

Intro.propTypes = {
    description: PropTypes.string.isRequired,
};
