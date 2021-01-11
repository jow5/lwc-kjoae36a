import "@lwc/synthetic-shadow";
import "https://unpkg.com/@salesforce-ux/design-system@2.13.1/assets/styles/salesforce-lightning-design-system.min.css";
import { createElement } from "lwc";
import App from "./app";
import LdsPageHeader from "./ldsPageHeader";

export const story = () => createElement("c-app", { is: App });

export const Simple = () => LdsPageHeader;
Simple.storyName = "Simple Layout";