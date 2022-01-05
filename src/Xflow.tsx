import { createElement, useMemo } from "react";


import { XflowContainerProps } from "../typings/XflowProps";
import { XflowComponent } from "./components/XflowComponent";
import { Store } from "./store";

import "./ui/Xflow.scss";

const parseStyle = (style = ""): { [key: string]: string } => {
    try {
        return style.split(";").reduce<{ [key: string]: string }>((styleObject, line) => {
            const pair = line.split(":");
            if (pair.length === 2) {
                const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                styleObject[name] = pair[1].trim();
            }
            return styleObject;
        }, {});
    } catch (_) {
        return {};
    }
};

export default function (props: XflowContainerProps) {
    console.log(props);
    const store = useMemo(() => new Store(), []);

    return <div style={parseStyle(props.style)}>
        <XflowComponent store={store}></XflowComponent>
    </div>;
}
