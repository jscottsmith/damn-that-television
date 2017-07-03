import React from 'react';
import PropTypes from 'prop-types';
import Copy from '../atoms/Copy';

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
