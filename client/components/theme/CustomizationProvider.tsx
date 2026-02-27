import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemePreset = "pitch" | "midnight" | "sunset" | "ocean";
export type FontPreset = "chakra" | "inter" | "system";

interface CustomizationState {
  themePreset: ThemePreset;
  primaryHue: number;
  radius: number;
  contrastBoost: boolean;
  compactMode: boolean;
  glowEffects: boolean;
  fontPreset: FontPreset;
}

interface CustomizationContextValue extends CustomizationState {
  updateSetting: <K extends keyof CustomizationState>(
    key: K,
    value: CustomizationState[K],
  ) => void;
  reset: () => void;
}

const defaultState: CustomizationState = {
  themePreset: "pitch",
  primaryHue: 142,
  radius: 0.75,
  contrastBoost: false,
  compactMode: false,
  glowEffects: true,
  fontPreset: "chakra",
};

const presetVariables: Record<
  ThemePreset,
  { background: string; card: string; muted: string; border: string }
> = {
  pitch: {
    background: "160 30% 6%",
    card: "160 30% 8%",
    muted: "160 20% 14%",
    border: "160 14% 20%",
  },
  midnight: {
    background: "230 34% 8%",
    card: "230 26% 12%",
    muted: "230 18% 16%",
    border: "230 12% 24%",
  },
  sunset: {
    background: "345 30% 9%",
    card: "345 24% 13%",
    muted: "345 18% 17%",
    border: "345 12% 24%",
  },
  ocean: {
    background: "198 36% 8%",
    card: "198 28% 12%",
    muted: "198 20% 16%",
    border: "198 14% 24%",
  },
};

const storageKey = "striker-customization-v1";

const CustomizationContext = createContext<CustomizationContextValue | null>(null);

export function CustomizationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CustomizationState>(() => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return defaultState;

    try {
      return { ...defaultState, ...JSON.parse(raw) } as CustomizationState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));

    const root = document.documentElement;
    const body = document.body;
    const preset = presetVariables[state.themePreset];

    root.style.setProperty("--background", preset.background);
    root.style.setProperty("--card", preset.card);
    root.style.setProperty("--popover", preset.card);
    root.style.setProperty("--muted", preset.muted);
    root.style.setProperty("--accent", preset.muted);
    root.style.setProperty("--border", preset.border);
    root.style.setProperty("--input", preset.border);
    root.style.setProperty("--radius", `${state.radius}rem`);

    const primary = `${state.primaryHue} 84% 47%`;
    root.style.setProperty("--primary", primary);
    root.style.setProperty("--ring", primary);
    root.style.setProperty("--sidebar-primary", primary);

    body.dataset.fontPreset = state.fontPreset;
    body.dataset.density = state.compactMode ? "compact" : "cozy";
    body.dataset.contrast = state.contrastBoost ? "boost" : "normal";
    body.dataset.glow = state.glowEffects ? "on" : "off";
  }, [state]);

  const value = useMemo<CustomizationContextValue>(
    () => ({
      ...state,
      updateSetting: (key, value) =>
        setState((current) => ({ ...current, [key]: value })),
      reset: () => setState(defaultState),
    }),
    [state],
  );

  return (
    <CustomizationContext.Provider value={value}>
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error("useCustomization must be used within CustomizationProvider");
  }

  return context;
}
