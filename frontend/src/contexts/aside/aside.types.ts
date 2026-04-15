import { School } from "api/types"

export enum AsideMode {
  SchoolDetails,
  CreateSchool,
}

export type AsidePayloadMap = {
  [AsideMode.SchoolDetails]: {
    school: School;
  };
  [AsideMode.CreateSchool]: {};
}

export type AsideState =
  | { isOpen: false; mode: null; payload: null }
  | { [M in AsideMode]: { isOpen: true; mode: M; payload: AsidePayloadMap[M] } }[AsideMode];