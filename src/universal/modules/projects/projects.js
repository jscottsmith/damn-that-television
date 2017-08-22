import { List } from 'immutable';
import axios from 'axios';

// Event Constant
export const PROJECTS_LOADED = 'PROJECTS_LOADED';
const initialState = List([]);

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case PROJECTS_LOADED:
            const projects = List(action.projects);
            // console.log('ACTION DATA', action.projects);
            return projects;

        default:
            return state;
    }
}

// Server and client fetch using Axios
export const fetchProjects = () => dispatch => {
    // debugger;
    const domain = process.env.DOMAIN_NAME;
    const port = process.env.PORT;
    const path = '/api/projects';
    const url = `${domain}:${port}${path}`;

    // const TEMP_URL = `http://localhost:3000${path}`;
    // console.log('GET URL', TEMP_URL);

    return axios
        .get(url)
        .then(response => {
            dispatch({
                type: PROJECTS_LOADED,
                projects: response.data,
            });
        })
        .catch(error => {
            console.log(error);
        });
};
