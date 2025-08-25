// stores/stickersStore.ts
import { create } from "zustand";

export type StickerImage = {
  id: string;
  file: File;
  url: string;
  repeat: number;
};

type Format = "A4" | "A5";

type StickersStore = {
  images: StickerImage[];
  format: Format;
  sizeMM: number;
  gapMM: number;
  padMM: number;
  setFormat: (format: Format) => void;
  setSizeMM: (size: number) => void;
  setGapMM: (gap: number) => void;
  setPadMM: (pad: number) => void;
  addImages: (files: File[]) => void;
  updateRepeat: (id: string, repeat: number) => void;
  removeImage: (id: string) => void;
};

export const useStickersStore = create<StickersStore>((set) => ({
  images: [],
  format: "A4",
  sizeMM: 30,
  gapMM: 5,
  padMM: 0,
  setFormat: (format) => set({ format }),
  setSizeMM: (sizeMM) => set({ sizeMM }),
  setGapMM: (gapMM) => set({ gapMM }),
  setPadMM: (padMM) => set({ padMM }),
  addImages: (files) =>
    set((state) => ({
      images: [
        ...state.images,
        ...files.map((file) => ({
          id: URL.createObjectURL(file),
          file,
          url: URL.createObjectURL(file),
          repeat: 1,
        })),
      ],
    })),
  updateRepeat: (id, repeat) =>
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, repeat } : img
      ),
    })),
  removeImage: (id) =>
    set((state) => ({
      images: state.images.filter((img) => img.id !== id),
    })),
}));
