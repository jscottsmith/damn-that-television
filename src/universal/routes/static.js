import React from 'react';
import Home from 'universal/components/pages/Home.js';
import Resume from 'universal/components/pages/Resume.js';
import NotFound from 'universal/components/pages/NotFound.js';
// import ProjectsContainer from 'universal/modules/projects/ProjectsContainer';
// import ProjectContainer from 'universal/modules/project/ProjectContainer';
import Main from 'universal/components/organisms/Main';

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
                path: '/resume',
                exact: true,
                component: Resume,
            },
            // {
            //     path: '/projects',
            //     exact: true,
            //     component: ProjectsContainer,
            // },
            // {
            //     path: '/projects/:slug',
            //     exact: true,
            //     component: ProjectContainer,
            // },
            {
                path: '*',
                component: NotFound,
            },
        ],
    },
];

export { routes };
