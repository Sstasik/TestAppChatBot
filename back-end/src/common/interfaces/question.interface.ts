
interface Nodes{
	id: string;
	type: string;
	data: { label: string; value: string };
	position: { x: number; y: number };
	measured?: { width: number; height: number };
	origin?: [number, number];
	selected?: boolean
	dragging?: boolean
};

export interface Edges {
	id: string;
	type: string;
	data: { label: string; value: string };
	source: string;
	target: string;
	selected: boolean;
};

export interface BotTree{
	nodes: Nodes[];
	edges: Edges[];
};