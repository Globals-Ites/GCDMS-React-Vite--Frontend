import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const supportedLocales = { en: true, ka: true };
const fallbackLocale = 'en';

export const setLocaleWithFallback = createAsyncThunk(
    'locale/setLocaleWithFallback',
    async (desiredLocale, { dispatch }) => {
        const finalLocale = supportedLocales[desiredLocale]
            ? desiredLocale
            : fallbackLocale;
        dispatch(setLocale(finalLocale));
    },
);

const localeSlice = createSlice({
    name: 'locale',
    initialState: {
        currentLocale: fallbackLocale,
    },
    reducers: {
        setLocale: (state, action) => {
            state.currentLocale = action.payload;
        },
    },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;