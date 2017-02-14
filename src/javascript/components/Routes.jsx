import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Application from 'components/Application';
import Index from 'components/pages/Index';
import Project from 'components/pages/Project';
import Projects from 'components/pages/Projects';
import NotFound from 'components/pages/NotFound';

export default (
    <Route path="/" component={Application}>
        <IndexRoute component={Index}/>
        <Route path="projects" component={Projects}/>
        <Route path="projects/:slug" component={Project}/>
        <Route path="*" component={NotFound}/>
    </Route>
);
