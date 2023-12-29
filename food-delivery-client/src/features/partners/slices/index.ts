import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "@/interfaces/enums";
import { RootState } from "@/app/store";
import partnersService from "@/features/partners/api";
import { VerifyPartnerRequestDto } from "@/features/partners/types/request";
import { PartnerStatus } from "@/features/partners/types/enums";
import { PartnersState } from "@/features/partners/types/state";

const initialState: PartnersState = {
  partners: [],
  status: StateStatus.None,
  message: "",
};

export const getPartners = createAsyncThunk("partners/get", async (_, thunkAPI) => {
  try {
    const { accessToken } = (thunkAPI.getState() as RootState).auth;
    return await partnersService.getPartners(accessToken!.payload);
  } catch (error: unknown) {
    let message: string = "";
    if (error instanceof Error) {
      message = error.message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const verifyPartner = createAsyncThunk(
  "partners/verify",
  async ({ partnerId, newStatus }: { partnerId: number; newStatus: PartnerStatus }, thunkAPI) => {
    try {
      const { accessToken } = (thunkAPI.getState() as RootState).auth;
      const requestDto: VerifyPartnerRequestDto = {
        status: newStatus,
      };
      return await partnersService.verifyPartner(partnerId, requestDto, accessToken!.payload);
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
        state.partners = action.payload;
      })
      .addCase(verifyPartner.pending, (state) => {
        state.status = StateStatus.Loading;
      })
      .addCase(verifyPartner.rejected, (state, action) => {
        state.status = StateStatus.Error;
        state.message = action.payload as string;
      })
      .addCase(verifyPartner.fulfilled, (state, action) => {
        state.status = StateStatus.Success;
        state.partners = state.partners.map((partner) => {
          if (partner.id === action.payload.id) {
            return action.payload;
          }
          return partner;
        });
      });
  },
});

export const partnersSelector = (state: RootState) => state.partners;
export const { reset, clearPartners } = partnersSlice.actions;
export default partnersSlice.reducer;
