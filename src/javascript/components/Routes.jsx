import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Application from 'components/Application';
import Index from 'pages/Index';
import Project from 'templates/Project';
import Projects from 'pages/Projects';
import NotFound from 'pages/NotFound';

export default (
    <Route path="/" component={Application}>
        <IndexRoute component={Index} />
        <Route path="projects" component={Projects} />
        <Route path="projects/:slug" component={Project} />
        <Route path="*" component={NotFound} />
    </Route>
);
