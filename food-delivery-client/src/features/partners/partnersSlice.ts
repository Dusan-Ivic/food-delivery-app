import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../interfaces/enums";
import { RootState } from "../../app/store";
import partnersService from "./partnersService";
import { PartnerState } from "../../interfaces/partner";
import { convertByteArrayToBlob } from "../../utils/imageConverter";

interface PartnersState {
  partners: PartnerState[];
  status: StateStatus;
  message: string;
}

const initialState: PartnersState = {
  partners: [],
  status: StateStatus.None,
  message: "",
};

export const getPartners = createAsyncThunk(
  "partners/get",
  async (_, thunkAPI) => {
    try {
      const { token } = (thunkAPI.getState() as RootState).auth;
      return await partnersService.getPartners(token);
    } catch (error: unknown) {
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = StateStatus.None;
      state.message = "";
    },
    clearPartners: (state) => {
      state.partners = [];
      state.status = StateStatus.None;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPartners.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(getPartners.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(getPartners.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.partners = action.payload.map((partner) => {
          return {
            ...partner,
            imageData: convertByteArrayToBlob(partner.imageData) ?? null,
          };
        });
      });
  },
});

export const partnersSelector = (state: RootState) => state.partners;
export const { reset, clearPartners } = partnersSlice.actions;
export default partnersSlice.reducer;
