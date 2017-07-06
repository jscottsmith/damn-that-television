import { List } from 'immutable';
import projects from '../../../content/projects.js';

const initialState = List(projects);

export default function reducer(state = initialState, action = {}) {
    return state;
}
