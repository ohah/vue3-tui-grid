import { TuiGrid } from "@/components";
import type { App, DefineComponent } from "vue";
import Grid from "tui-grid";
import { OptThemePresetNames, OptI18nData, OptPreset, OptColumn } from "tui-grid/types/options";
import { VueCellRenderer } from "@/Renderer";

interface Vue3OptColumn extends OptColumn {
  vue3renderer?: (row:any) => typeof VueCellRenderer
}

interface TuiGridElement extends DefineComponent {
  /**
   * 함수 실행
   * @param methodName https://nhn.github.io/tui.grid/latest/ 참조
   * @param args 객체
   */
  invoke(methodName: string, ...args: any): void;
  /**
   * 언어 설정
   * @param localeCode "ko" | "en"
   */
  setLanguage(localeCode: string, data?: OptI18nData): void;
  /**
   * 테마 적용
   * @param theme "default" | "striped" | "clean"
   */
  applyTheme(presetName: OptThemePresetNames, extOptions?: OptPreset): void;
  /**
   * Grid 객체
   */
  gridInstance: Grid;
  /**
   * rootElement
   */
  rootElement: HTMLElement;
}

export default {
  install: (app: App) => {
    app.component("tui-grid", TuiGrid);
  },
};

export { TuiGrid };
export type { TuiGridElement, Vue3OptColumn }