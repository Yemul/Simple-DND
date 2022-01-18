import React, { useState } from 'react';
import { Item } from './Item';

const TOTAL_ITEMS = 20;

type ContainerState = {
    items: Item[];
    dragIndex: number | undefined;
    hoverIndex: number | undefined;
    insertIndex: number | undefined;
    lastSelectionIndex: number | undefined;
    selectedItem: Item | undefined;
    isDragging: boolean;
};

const initial_items: Item[] =
[...Array(TOTAL_ITEMS).keys()].map(i => ({
    id: i + 1,
    text: `List Item ${i}`
}));

const initial_state: ContainerState = {
    items: initial_items,
    selectedItem: undefined,
    dragIndex: undefined,
    hoverIndex: undefined,
    insertIndex: undefined,
    lastSelectionIndex: undefined,
    isDragging: false,
}

export const Container = () => {
    const [state, set_state] = useState(initial_state);
    
    const handle_selection = (index: number) => {
        const { items }  = state;
        const new_item = items[index];
        set_state({ ...state, selectedItem: new_item, lastSelectionIndex: index });
    };

    const clear_selection = () => set_state({
        ...state,
        selectedItem: undefined,
        lastSelectionIndex: undefined
    });

    const set_insert_indices = (drag_index: number, hover_index: number, new_insert_index: number) => {
        if (state.dragIndex === drag_index && state.hoverIndex === hover_index && state.insertIndex === new_insert_index)
            return;
        set_state({
            ...state,
            dragIndex: drag_index,
            hoverIndex: hover_index,
            insertIndex: new_insert_index
        })
    };

    const rearrange_items = (dragged_item: Item) => {
        const items = state.items.slice();
        let dividing_index: number;
        if (state.insertIndex !== undefined && state.insertIndex < items.length)
            dividing_index = state.insertIndex;
        else
            dividing_index = items.length;
        const before = items.slice(0, dividing_index).filter(({id}) => id !== dragged_item.id);
        const after = items.slice(dividing_index).filter(({id}) => id !== dragged_item.id);
        const new_items = before.concat([dragged_item]).concat(after);
        set_state({
            ...state,
            items: new_items
        })
    }
}

