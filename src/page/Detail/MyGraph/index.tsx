import React, { useEffect, useRef } from 'react';
import RelationGraph, { RelationGraphInstance } from 'relation-graph-react';
import type { MutableRefObject } from 'react';
import { Tooltip } from 'react-tooltip';
import type {
    RGLine,
    RGLink,
    RGNode,
    RGNodeSlotProps,
    RGOptions,
    RelationGraphExpose,
} from 'relation-graph-react';
import './index.scss';
const defaultAvatar =
    'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar-square.png';

const staticJsonData = {
    rootId: '2',
    nodes: [
        {
            id: '1',
            text: '节点-1',
            data: {
                image: defaultAvatar,
                imageWidth: '100px',
                imageHeight: '100px',
            },
        },
        { id: '2', text: '节点-2' },
        { id: '3', text: '节点-3' },
        { id: '4', text: '节点-4' },
        { id: '6', text: '节点-6' },
        { id: '7', text: '节点-7' },
        { id: '8', text: '节点-8' },
        { id: '9', text: '节点-9' },
        { id: '71', text: '节点-71' },
        { id: '72', text: '节点-72' },
        { id: '73', text: '节点-73' },
        { id: '81', text: '节点-81' },
        { id: '82', text: '节点-82' },
        { id: '83', text: '节点-83' },
        { id: '84', text: '节点-84' },
        { id: '85', text: '节点-85' },
        { id: '91', text: '节点-91' },
        { id: '92', text: '节点-82' },
        { id: '5', text: '节点-5' },
    ],
    lines: [
        { from: '2', to: '3', text: '投资' },
        { from: '2', to: '72', text: '投资' },
        { from: '2', to: '73', text: '投资' },
        { from: '2', to: '81', text: '投资' },
        { from: '2', to: '82', text: '投资' },
        { from: '2', to: '83', text: '投资' },
        { from: '2', to: '84', text: '投资' },
        { from: '2', to: '85', text: '投资' },
        { from: '2', to: '91', text: '投资' },
        { from: '2', to: '92', text: '投资' },
        { from: '2', to: '5', text: '投资' },
        { from: '2', to: '1', text: '高管' },
        { from: '2', to: '7', text: '高管' },
        { from: '2', to: '8', text: '高管' },
        { from: '2', to: '9', text: '高管' },
        { from: '2', to: '6', text: '高管' },
        { from: '2', to: '4', text: '投资' },
        { from: '2', to: '71', text: '投资' },
    ],
};

const NodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
    console.log('NodeSlot:');
    if (node.id === '2') {
        // if rootNode
        return (
            <div
                style={{
                    zIndex: 555,
                    background: '#FBEC50',
                    color: '#000',
                    fontSize: '16px',
                    fontFamily: 'Poppins',
                    fontWeight: '600',
                    display: 'inline-flex',
                    height: '32px',
                    alignItems: 'center',
                    padding: '0 12px',
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                }}
            >
                {node.text}
            </div>
        );
    }
    return node.data?.image ? (
        <img
            alt=""
            src={node.data.image}
            style={{
                width: node.data?.imageWidth,
                height: node.data?.imageHeight,
            }}
        />
    ) : (
        <div
            data-tooltip-id="my-graph"
            data-tooltip-html={`<div>${node.text}</div>`}
            style={{
                display: 'inline-flex',
                height: '32px',
                padding: '0px 12px',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
                fontWeight: '600',
                color: '#FFF',
                fontFamily: 'Poppins',
                whiteSpace: 'nowrap',
            }}
        >
            <span>{node.text}</span>
        </div>
    );
};
const MyGraph: React.FC = () => {
    const graphRef = useRef() as MutableRefObject<RelationGraphExpose>;

    useEffect(() => {
        showGraph();
    }, []);
    const showGraph = async () => {
        await graphRef.current.setJsonData(staticJsonData, (graphInstance) => {});
        const graphInstance = graphRef.current?.getInstance();
        if (graphInstance) {
            await graphInstance.setZoom(96);
        }
    };
    const options: RGOptions = {
        debug: true,
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border',
        defaultNodeColor: '#2b2625',
        defaultNodeShape: 1,
        defaultNodeBorderWidth: 0,
        defaultLineShape: 1,
        defaultLineColor: 'rgba(255, 255, 255, 0.40)',
        backgroundColor: 'transparent',
        defaultNodeBorderColor: 'transparent',
        defaultNodeFontColor: '#FFF',
        toolBarDirection: 'h',
        toolBarPositionH: 'right',
        toolBarPositionV: 'bottom',
        zoomToFitWhenRefresh: true,
        canvasZoom: 80,
        layout: {
            layoutName: 'center',
            maxLayoutTimes: 3000,
            layoutClassName: 'seeks-layout-force',
        },
        defaultExpandHolderPosition: 'right',
    };
    const onNodeClick = (node: RGNode, _e: MouseEvent | TouchEvent) => {
        console.log('onNodeClick:', node.text);
        return true;
    };
    const onLineClick = (line: RGLine, _link: RGLink, _e: MouseEvent | TouchEvent) => {
        console.log('onLineClick:', line.text, line.from, line.to);
        return true;
    };
    return (
        <div className="my-graph">
            <div className="my-graph-box">
                <RelationGraph
                    ref={graphRef}
                    options={options}
                    nodeSlot={NodeSlot}
                    onNodeClick={onNodeClick}
                    onLineClick={onLineClick}
                />
            </div>
            <Tooltip id="my-graph" place="right" />
        </div>
    );
};
export default MyGraph;
