import BaseStore from 'fluxible/addons/BaseStore';
import { projects } from '../../content/projects';

class ProjectsStore extends BaseStore {
    static storeName = 'ProjectsStore';

    constructor(dispatcher) {
        super(dispatcher);
        this.projects = projects;
    }

    getState() {
        return this.projects;
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.projects = state.projects;
    }
}

export default ProjectsStore;
