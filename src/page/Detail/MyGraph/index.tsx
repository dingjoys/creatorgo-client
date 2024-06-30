import React, { useEffect, useMemo, useRef } from 'react';
import RelationGraph, { RelationGraphInstance } from 'relation-graph-react';
import type { MutableRefObject } from 'react';
import { Tooltip } from 'react-tooltip';
import { CollectionItem } from '@/core/home/neynar';
import type {
    RGLine,
    RGLink,
    RGNode,
    RGNodeSlotProps,
    RGOptions,
    RelationGraphExpose,
} from 'relation-graph-react';
import './index.scss';
import IpfsImage from '@/component/IpfsImage';
const defaultAvatar =
    'https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/default-user-avatar-square.png';

// const staticJsonData = {
//     rootId: '2',
//     nodes: [
//         {
//             id: '1',
//             text: '节点-1',
//             data: {
//                 image: defaultAvatar,
//                 imageWidth: '100px',
//                 imageHeight: '100px',
//             },
//         },
//         { id: '2', text: '节点-2' },
//         { id: '3', text: '节点-3' },
//         { id: '4', text: '节点-4' },
//         { id: '6', text: '节点-6' },
//         { id: '7', text: '节点-7' },
//         { id: '8', text: '节点-8' },
//         { id: '9', text: '节点-9' },
//         { id: '71', text: '节点-71' },
//         { id: '72', text: '节点-72' },
//         { id: '73', text: '节点-73' },
//         { id: '81', text: '节点-81' },
//         { id: '82', text: '节点-82' },
//         { id: '83', text: '节点-83' },
//         { id: '84', text: '节点-84' },
//         { id: '85', text: '节点-85' },
//         { id: '91', text: '节点-91' },
//         { id: '92', text: '节点-82' },
//         { id: '5', text: '节点-5' },
//     ],
//     lines: [
//         { from: '2', to: '3', text: '投资' },
//         { from: '2', to: '72', text: '投资' },
//         { from: '2', to: '73', text: '投资' },
//         { from: '2', to: '81', text: '投资' },
//         { from: '2', to: '82', text: '投资' },
//         { from: '2', to: '83', text: '投资' },
//         { from: '2', to: '84', text: '投资' },
//         { from: '2', to: '85', text: '投资' },
//         { from: '2', to: '91', text: '投资' },
//         { from: '2', to: '92', text: '投资' },
//         { from: '2', to: '5', text: '投资' },
//         { from: '2', to: '1', text: '高管' },
//         { from: '2', to: '7', text: '高管' },
//         { from: '2', to: '8', text: '高管' },
//         { from: '2', to: '9', text: '高管' },
//         { from: '2', to: '6', text: '高管' },
//         { from: '2', to: '4', text: '投资' },
//         { from: '2', to: '71', text: '投资' },
//     ],
// };

const NodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
    console.log('NodeSlot:');
    if (node.id === '0') {
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
            data-tooltip-id="my-graph"
            data-tooltip-content={JSON.stringify(node.data)}
            src={node.data.image}
            style={{
                width: node.data?.imageWidth,
                height: node.data?.imageHeight || 'auto',
            }}
        />
    ) : (
        <div
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
const MyGraph = ({ collections, creatorName }: { collections: CollectionItem[]; creatorName }) => {
    const graphRef = useRef() as MutableRefObject<RelationGraphExpose>;
    const totalTokens = useMemo(() => {
        return collections.reduce((arr, item) => {
            arr = arr.concat(
                item.tokens.map((token) => ({
                    ...token,
                    collectionMetadata: item.metadata,
                    mintfun: item.mintfun,
                })),
            );

            return arr;
        }, []);
    }, [collections]);
    const staticJsonData = {
        rootId: '0',
        nodes: [
            {
                id: '0',
                text: creatorName,
            },
        ]
            .concat(
                totalTokens.map((item, index) => {
                    let avatar = item.metadata?.image;

                    let name = item.metadata?.name;

                    const hash = avatar?.split('ipfs://')?.[1];
                    if (hash) {
                        avatar = `https://metopia.quicknode-ipfs.com/ipfs/${hash}`;
                    }
                    return {
                        id: String(index + 1),
                        text: 'node',
                        data: {
                            mintProfile: item.mintfun?.profiles,
                            minterDetail: item.mintfun?.details,
                            name,
                            collectionMetadata: item.collectionMetadata,
                            image: avatar || defaultAvatar,
                            imageWidth: 200 * (Math.random() * 0.5) + 'px',
                        },
                    };
                }),
            )
            .concat(
                totalTokens.map((item, index) => {
                    const minter = item.mintfun?.profiles?.[0]?.name;
                    return {
                        id: `sub-${String(index + 1)}`,
                        text: minter,
                    };
                }),
            ),
        lines: collections
            ?.map((item, index) => {
                return { from: '0', to: String(index + 1), text: '' };
            })
            .concat(
                collections?.map((item, index) => {
                    return {
                        from: String(index + 1),
                        to: `sub-${String(index + 1)}`,
                        text: 'line',
                    };
                }),
            ),
    };

    console.log('staticJsonData', staticJsonData);
    useEffect(() => {
        if (collections?.length) {
            showGraph();
        }
    }, [collections]);
    const showGraph = async () => {
        await graphRef.current.setJsonData(staticJsonData, (graphInstance) => {});
        const graphInstance = graphRef.current?.getInstance();
        if (graphInstance) {
            await graphInstance.setZoom(66);
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
            <Tooltip
                style={{
                    padding: 0,
                    margin: 0,
                    background: 'transparent',
                    zIndex: '111111111',
                }}
                id="my-graph"
                render={({ content }) => {
                    let node = {};
                    try {
                        node = JSON.parse(content);
                    } catch (e) {}
                    const avatar = node?.image;
                    const name = node?.name;
                    const profiles = node?.mintProfile || [];
                    const collectionAvatar = node?.collectionMetadata?.image;
                    const collectionName = node?.collectionMetadata?.name;
                    const totalMinters = node?.minterDetail?.minterCount;
                    const topMinters = node?.minterDetail?.topMinters || [];

                    return (
                        <div className="tooltip-warpper">
                            <div className="tooltip-header">
                                <IpfsImage src={avatar} className="tooltip-header-img" />
                                <div>
                                    <div className="tooltip-header-name">{name | 'name'}</div>
                                    <div className="tooltip-header-date">
                                        25/06/2024
                                        <span className="tooltip-header-line"></span>
                                        <IpfsImage
                                            src={collectionAvatar}
                                            className="th-user-avatar"
                                        />
                                        <span>From {collectionName}</span>
                                    </div>
                                    <div className="th-total-minters">{totalMinters} Mints</div>
                                </div>
                            </div>
                            <div>
                                <div className="tooltip-top-minters">Top minters</div>
                                <ul className="ttm-ul">
                                    {topMinters?.map((item, index) => {
                                        const profile = profiles?.find((p) => p.id === item.minter);

                                        return (
                                            <li key="index" className="ttm-li">
                                                {/* <img className="ttm-li-img" /> */}
                                                <span className="ttm-li-name">{profile?.name}</span>
                                                <span className="ttm-li-line"></span>
                                                <span className="ttm-li-count">
                                                    {item.count} items
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    );
                }}
            ></Tooltip>
        </div>
    );
};
export default MyGraph;
