import { defineComponent } from 'vue'
import Grid from 'tui-grid';
import { OptThemePresetNames, localeCode, OptI18nData, OptPreset } from 'tui-grid/types/options';
declare class TuiGridElement extends defineComponent {
  /**
   * 함수 실행
   * @param methodName https://nhn.github.io/tui.grid/latest/ 참조
   * @param args 객체
   */
  invoke(methodName:string, ...args:any)
  /**
   * 언어 설정
   * @param localeCode "ko" | "en"
   */
  setLanguage(localeCode: string, data?: OptI18nData): void;
  /**
   * 테마 적용
   * @param theme "default" | "striped" | "clean"
   */
  applyTheme(presetName:OptThemePresetNames, extOptions?:OptPreset): void;
  /**
   * Grid 객체
   */
  gridInstance:Grid
  /**
   * rootElement
   */
  rootElement:HTMLElement
}

