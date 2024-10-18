import { FC, memo, useCallback, useEffect, useMemo } from "react";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  FinalConnectionState,
  Node,
  ReactFlow,
  SelectionMode,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import { Answer, Question } from "@/entities/BotTree";

import { TextUpdaterNode } from "./TextUpdaterNode";
import { TextUpdaterEdge } from "./TextUpdaterEdge";

const panOnDrag = [1, 2];

let id = 1;
const getId = () => `${id++}`;
const nodeOrigin: [number, number] = [0.5, 0];

type BotBuilderProps = {
  initialNodes: Question[];
  initialEdges: Answer[];
};

export const BotBuilder: FC<BotBuilderProps> = memo(
  ({ initialNodes, initialEdges }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const { screenToFlowPosition } = useReactFlow();

    useEffect(() => {
      console.log(nodes, edges);
    }, [nodes, edges]);

    const onConnect = useCallback(
      (params: Connection) => setEdges((eds) => addEdge(params, eds)),
      [setEdges]
    );

    const onConnectEnd = useCallback(
      (
        event: MouseEvent | TouchEvent,
        connectionState: FinalConnectionState
      ) => {
        // when a connection is dropped on the pane it's not valid
        if (!connectionState.isValid) {
          // we need to remove the wrapper bounds, in order to get the correct position
          const id = getId();
          const { clientX, clientY } =
            "changedTouches" in event ? event.changedTouches[0] : event;
          const newNode: Node = {
            id,
            type: "textUpdater",
            position: screenToFlowPosition({
              x: clientX,
              y: clientY,
            }),
            data: { label: `Question ${id}`, value: `Question text ${id}?` },
            origin: [0.5, 0.0],
          };

          //@ts-ignore
          setNodes((nds) => nds.concat(newNode));
          setEdges((eds) =>
            //@ts-ignore
            eds.concat({
              id,
              type: "textUpdater",
              data: { label: "Answer", value: "Answer" },
              //@ts-ignore
              source: connectionState.fromNode.id,
              target: id,
            })
          );
        }
      },
      [screenToFlowPosition, setEdges, setNodes]
    );

    const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
    const edgeTypes = useMemo(() => ({ textUpdater: TextUpdaterEdge }), []);

    return (
      <div className="h-[500px]">
        <ReactFlow
          className="dark"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          panOnScroll
          selectionOnDrag
          panOnDrag={panOnDrag}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          selectionMode={SelectionMode.Partial}
          nodeOrigin={nodeOrigin}
          defaultViewport={{ x: 200, y: 150, zoom: 1 }}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    );
  }
);
