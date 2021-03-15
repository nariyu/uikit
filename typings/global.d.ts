declare module '*.scss';
declare module '*.svg';
declare module '*.json';
declare module '*.html';
declare module '*.text';
declare module '*.md';

declare const gtag: (command: string, ...opts: unknown) => void;

declare module '*.svg' {
  const content: unknown;
  export default content;
}

declare module 'react-fastclick';

interface Window {
  gtag?: (type: string, trackingId: string, params: any) => void;
  FB?: {
    ui: (options: { method: 'share'; href: string }) => void;
  };
}
interface Navigator {
  share?: (options?: {
    url: string;
    text?: string;
    title?: string;
  }) => Promise<unknown>;
}

interface Webkit {
  messageHandlers: any;
}

type PresentationMode = 'picture-in-picture' | 'inline';
interface HTMLVideoElement {
  webkitPresentationMode: PresentationMode;
  webkitSupportsPresentationMode: PresentationMode;
  webkitSetPresentationMode: (mode: PresentationMode) => void;
}

declare interface SafeAreaMargins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
