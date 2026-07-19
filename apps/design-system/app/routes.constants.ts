import type { AppChromeRoutes } from "@/components/app-chrome/types";
import {
  CursorArrowRaysIcon,
  LanguageIcon,
  PaintBrushIcon,
  PencilSquareIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  Square2StackIcon,
  SwatchIcon,
} from "@heroicons/react/16/solid";

export const routes: AppChromeRoutes = {
  "design-system": {
    title: "Design System",
    absolutePath: "/",
    icon: SparklesIcon,
    children: {
      buttons: {
        title: "Buttons",
        absolutePath: "/buttons",
        icon: CursorArrowRaysIcon,
      },
      colors: {
        title: "Colors",
        absolutePath: "/colors",
        icon: SwatchIcon,
      },
      components: {
        title: "Components",
        absolutePath: "/components",
        icon: PuzzlePieceIcon,
      },
      inputs: {
        title: "Inputs",
        absolutePath: "/inputs",
        icon: PencilSquareIcon,
      },
      surfaces: {
        title: "Surfaces",
        absolutePath: "/surfaces",
        icon: Square2StackIcon,
      },
      theme: {
        title: "Theme",
        absolutePath: "/theme",
        icon: PaintBrushIcon,
      },
      typography: {
        title: "Typography",
        absolutePath: "/typography",
        icon: LanguageIcon,
      },
    },
  },
};
