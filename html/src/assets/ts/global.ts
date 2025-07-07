// export interface CommonFunctionType {
//   init: () => void;
//   isMob: () => boolean;
//   scrollReset: () => void;
//   scrollGage: () => number;
//   animate: () => void;
//   toggleTheme: () => void;
//   axiosListUp: () => Promise<any>;
//   copyToClipboard: (val: string) => void;
//   toastPopup: (txt: string) => void;
//   countRating: () => void;
// }

import CommonFunction from './common';

export default class _gb {
  wW: number;
  wH: number;
  html: HTMLElement;
  body: HTMLElement;
  layout: HTMLElement | null;
  main: HTMLElement | null;
  header: HTMLElement | null;
  menu: HTMLElement | null;
  btnAllMenuOpen: HTMLElement | null;
  title: NodeListOf<Element>;
  anchor: NodeListOf<HTMLAnchorElement>;
  rRange: NodeListOf<HTMLElement>;
  CommonFunction: typeof CommonFunction;
  scrollTop: number;
  client_H: number;
  scroll_H: number;
  scrollSize: number;
  listTrg: HTMLElement | null;
  animate: NodeListOf<Element>;
  scrollGage: HTMLElement | null;
  toast: boolean;
  isScroll : Boolean;
  isPlay : Boolean;

  constructor() {
    this.wW = window.innerWidth;
    this.wH = window.innerHeight;
    this.html = document.documentElement;
    this.body = document.body;
    this.layout = document.getElementById('layout');
    this.main = document.querySelector('main');
    this.header = document.getElementById('gnb');
    this.menu = document.querySelector('.menu');
    this.btnAllMenuOpen = document.querySelector('.button-allMenu-open');
    this.title = document.querySelectorAll('.r-tit');
    this.anchor = document.querySelectorAll('.anchor');
    this.rRange = document.querySelectorAll('.r-range');
    this.scrollTop = 0;
    this.client_H = 0;
    this.scroll_H = 0;
    this.scrollSize = 0;
    this.listTrg = null;
    this.animate = document.querySelectorAll('.animate');
    this.scrollGage = null;
    this.toast = false;
    this.isScroll = false;
    this.isPlay = true;
    
    // CommonFunction 초기화
     this.CommonFunction = CommonFunction;
  }
}
