import { configure } from "mobx";

configure({ enforceActions: "observed", isolateGlobalState: true, useProxies: "never" });

export class Store {
    /**
     * dispose
     */
    public dispose() {}

    constructor() {
        // makeObservable(this, { options: observable, load: flow.bound });
    }
}
