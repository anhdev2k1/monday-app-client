import React, { ReactNode } from 'react';

export interface IChildrenComponentProps {
   children?: ReactNode;
}

export enum StatusType {
   Primary = 'primary',
   Active = 'active',
   Disabled = 'disabled',
   Transparent = 'transparent',
   Warning = 'warning',
   Boder = 'boder',
   Nonbehavior = 'nonbehavior',
}
export enum SizeType {
   Small = 'small',
   Large = 'large',
   Medium = 'medium',
}

type LayoutType = React.FC<IChildrenComponentProps> | null;
export interface IRoutes {
   path: string;
   component: React.ComponentType<any>;
   layout?: LayoutType;
}

export interface IResponseData<T> {
   message: string;
   status: string;
   statusCode: number;
   metadata?: T;
}
