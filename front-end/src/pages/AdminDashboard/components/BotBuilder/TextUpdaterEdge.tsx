import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from "@xyflow/react";
import { memo, useCallback } from "react";

export const TextUpdaterEdge = memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    markerEnd,
  }: EdgeProps & { data: { label: string; value: string } }) => {
    // const { setEdges } = useReactFlow();

    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    const onChange = useCallback(
      (evt: React.ChangeEvent<HTMLInputElement>) => {
        data.label = evt.target.value;
        data.value = evt.target.value;
      },
      [data]
    );

    return (
      <>
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              // everything inside EdgeLabelRenderer has no pointer events by default
              // if you have an interactive element, set pointer-events: all
              pointerEvents: "all",
            }}
            className="nodrag nopan"
          >
            <input
              id={`edge-${id}`}
              name="text"
              defaultValue={data.value}
              onChange={onChange}
              className="bg-transparent py-2 text-[14px] translate-x-1/2 nodrag outline-none"
            />
          </div>
        </EdgeLabelRenderer>
      </>
    );
  }
);
