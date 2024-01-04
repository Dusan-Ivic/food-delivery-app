import { useAuthUser } from "@/features/auth/hooks";
import partnersService from "@/features/partners/api";
import { PartnerRequestDto, VerifyPartnerRequestDto } from "@/features/partners/types/request";
import { PartnerResponseDto } from "@/features/partners/types/response";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function usePartners() {
  const [partners, setPartners] = useState<PartnerResponseDto[]>([]);
  const { accessToken } = useAuthUser();

  useEffect(() => {
    const getPartners = async (accessToken: string) => {
      setPartners(await partnersService.getPartners(accessToken));
    };

    if (accessToken) {
      getPartners(accessToken.payload);
    }
  }, [accessToken]);

  const verifyPartner = async (partnerId: number, data: VerifyPartnerRequestDto) => {
    if (accessToken) {
      await partnersService.verifyPartner(partnerId, data, accessToken.payload);
      setPartners(await partnersService.getPartners(accessToken.payload));
    }
  };

  const registerPartner = async (data: PartnerRequestDto) => {
    await partnersService.registerPartner(data);
    toast.success("New partner has been registered");
  };

  return { partners, registerPartner, verifyPartner };
}
