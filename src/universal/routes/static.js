import React from 'react';
import Home from 'Universal/components/pages/Home.js';
import NotFound from 'Universal/components/pages/NotFound.js';
import ProjectsContainer from 'Universal/modules/projects/ProjectsContainer';
import ProjectContainer from 'Universal/modules/project/ProjectContainer';
import Main from 'Universal/components/organisms/Main';

const routes = [
    {
        component: Main,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home,
            },
            {
                path: '/projects',
                exact: true,
                component: ProjectsContainer,
            },
            {
                path: '/projects/:slug',
                exact: true,
                component: ProjectContainer,
            },
            {
                path: '*',
                component: NotFound,
            },
        ],
    },
];

export { routes };
