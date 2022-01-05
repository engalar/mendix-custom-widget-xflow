import { useSize, useUpdateEffect } from "ahooks";
import { createElement, useEffect, useRef, useState } from "react";
import { Store } from "../store";

import { Graph } from '@antv/x6'

import jsonData from './bpmn.json';
import { MDSLayout, Model } from "@antv/layout";

Graph.registerNode(
    'event',
    {
        inherit: 'circle',
        attrs: {
            body: {
                strokeWidth: 2,
                stroke: '#5F95FF',
                fill: '#FFF',
            },
        },
    },
    true,
)

Graph.registerNode(
    'activity',
    {
        inherit: 'rect',
        markup: [
            {
                tagName: 'rect',
                selector: 'body',
            },
            {
                tagName: 'image',
                selector: 'img',
            },
            {
                tagName: 'text',
                selector: 'label',
            },
        ],
        attrs: {
            body: {
                rx: 6,
                ry: 6,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
                strokeWidth: 1,
            },
            img: {
                x: 6,
                y: 6,
                width: 16,
                height: 16,
                'xlink:href':
                    'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*pwLpRr7QPGwAAAAAAAAAAAAAARQnAQ',
            },
            label: {
                fontSize: 12,
                fill: '#262626',
            },
        },
    },
    true,
)

Graph.registerNode(
    'gateway',
    {
        inherit: 'polygon',
        attrs: {
            body: {
                refPoints: '0,10 10,0 20,10 10,20',
                strokeWidth: 2,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
            },
            label: {
                text: '+',
                fontSize: 40,
                fill: '#5F95FF',
            },
        },
    },
    true,
)

Graph.registerEdge(
    'bpmn-edge',
    {
        inherit: 'edge',
        attrs: {
            line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
            },
        },
    },
    true,
)


export interface XflowComponentProps {
    store: Store;
}


export function XflowComponent(props: XflowComponentProps) {
    console.log(props);
    const graphRef = useRef<any>();
    const wrapperRef = useRef<any>();
    const size = useSize(wrapperRef);

    const [graphInstance, setGraphInstance] = useState<Graph>();
    useEffect(() => {
        const graph: Graph = new Graph({
            container: graphRef.current,
            connecting: {
                router: 'orth',
            },
        });

        setGraphInstance(graph);

        const data: Model = {
            nodes: [],
            edges: [],
        }
        jsonData.forEach((item: any) => {
            if (item.shape === 'bpmn-edge') {
                data.edges!.push(item)
            } else {
                data.nodes!.push(item)
            }
        })

        const layout = new MDSLayout({
            type: 'mds',
            linkDistance: 400
        })
        const model = layout.layout(data)

        graph.fromJSON(model)
        graph.zoomToFit({ padding: 10, maxScale: 1 })


    }, []);

    useUpdateEffect(() => {
        if (graphInstance && size.width && size.height) {
            graphInstance.size.resize(size.width, size.height);
        }
    }, [size, graphInstance]);
    return <div className="mxcn-resize-wrapper" ref={wrapperRef}>
        <div className="mxcn-resize" ref={graphRef}></div>
    </div>;
}

