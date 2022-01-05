/**
 * This file was generated from Xflow.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    tabIndex: number;

    uniqueid: string;
    friendlyId?: string;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
    style: string;
}

export interface XflowContainerProps extends CommonProps {
    myString: string;
}

export interface XflowPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    myString: string;
}

export interface VisibilityMap {
    myString: boolean;
}
