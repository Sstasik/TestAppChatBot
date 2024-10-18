import { memo, useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

export const TextUpdaterNode = memo(
  ({ id, data }: { id: string; data: { label: string; value: string } }) => {
    const onChange = useCallback(
      (evt: React.ChangeEvent<HTMLInputElement>) => {
        data.value = evt.target.value;
        data.label = evt.target.value;
      },
      [data]
    );

    return (
      <>
        <Handle type="target" position={Position.Top} />
        <div className="flex flex-col border-zinc-600 bg-zinc-900 px-4 py-2 border rounded-md">
          <label className="font-bold">Question:</label>
          <input
            name="text"
            value={data.value}
            onChange={onChange}
            className="bg-transparent py-2 border-b nodrag outline-none"
          />
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
      </>
    );
  }
);
