import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';


export type Item = {
    id: number;
    text: string;
}

export type ItemProps = {
    key: string;
    id: number;
    text: string;
    selectedItem: Item | undefined;
    isSelected: boolean;
    indicatorOnTop: boolean;
    indicatorOnBottom: boolean;
    rearrangeItems: (dragged_item: Item) => void;
    setInsertIndex: (drag_index: number, hover_index: number, new_insert_index: number) => void;
    clearSelection: () => void;
    onSelectionChange: (new_index: number) => void;
}


export const Item = (props: ItemProps) => {
    const item_ref = useRef(null);
    const { id, text } = props; 
    const [{ isDragging }, drag, preview] = useDrag({
        type: 'Item',
        item: () => {
            return { id, text }
        },
        begin: (monitor) => {
            return {}
        },
        isDragging: (monitor) => {
            return monitor.getItem()
        }
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });
}
