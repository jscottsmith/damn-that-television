import { List } from 'immutable';
import 'isomorphic-fetch';
import tempProjects from '../../../content/projects.js';
import axios from 'axios';

const initialState = List(tempProjects);

// Event Constant
export const PROJECTS_LOADED = 'PROJECTS_LOADED';

// Reducer
export default function reducer(state = [], action = {}) {
    switch (action.type) {
        case PROJECTS_LOADED:
            const projects = List(action.projects);
            // const projects = initialState;
            console.log('ACTION DATA', action.projects);
            return projects;

        default:
            return state;
    }
}

// Fetcher
// NOTE: only absolute urls are supported
export const fetchProjects = () => dispatch => {
    // const domain = process.env.DOMAIN_NAME;
    // const port = process.env.API_PORT;
    const path = '/api/projects';
    // const url = `${domain}:${port}${path}`;

    const TEMP_URL = `http://localhost:3000${path}`;
    console.log('GET URL', TEMP_URL);

    return axios
        .get(TEMP_URL)
        .then(response => {
            // console.log(response.data);
            // console.log(response.status);
            // console.log(response.statusText);
            // console.log(response.headers);
            // console.log(response.config);
            dispatch({
                type: PROJECTS_LOADED,
                projects: response.data,
            });
        })
        .catch(error => {
            console.log(error);
        });
};
