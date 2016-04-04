import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Application from 'components/Application';
import Project from 'components/Project';
import Projects from 'components/Projects';
import NotFound from 'components/NotFound';

export default (
    <Route path="/" component={Application}>
        <IndexRoute component={Projects}/>
        <Route path="projects" component={Projects}/>
        <Route path="projects/:slug" component={Project}/>
        <Route path="*" component={NotFound}/>
    </Route>
);
