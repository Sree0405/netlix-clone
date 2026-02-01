import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "src/types/Movie";

interface MyListState {
    items: Movie[];
}

const initialState: MyListState = {
    items: JSON.parse(localStorage.getItem("myList") || "[]"),
};

const myListSlice = createSlice({
    name: "myList",
    initialState,
    reducers: {
        addToMyList: (state, action: PayloadAction<Movie>) => {
            const exists = state.items.find((item) => item.id === action.payload.id);
            if (!exists) {
                state.items.push(action.payload);
                localStorage.setItem("myList", JSON.stringify(state.items));
            }
        },
        removeFromMyList: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            localStorage.setItem("myList", JSON.stringify(state.items));
        },
    },
});

export const { addToMyList, removeFromMyList } = myListSlice.actions;
export default myListSlice.reducer;
