import React, { Children, useEffect, useState } from 'react';
import { Resizable } from 're-resizable';
import { IChildrenComponentProps } from '~/shared/model/global';
import './resizable.scss';

interface IResizableBox extends IChildrenComponentProps {
   id: string;
   right?: false;
}

export default function ResizableBox({ children, id, right }: IResizableBox) {
   const [state, setState] = useState({ width: 320, height: 40 });
   return (
      <Resizable
         enable={{
            top: false,
            right,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
         }}
         className={`col__group__item col__${id}`}
         size={{ width: state.width, height: state.height }}
         as={'li'}
         onResizeStop={(d: any) => {
            setState({
               width: state.width + d.width,
               height: state.height + d.height,
            });

            const listElemtResizableBox: HTMLCollectionOf<Element> =
               document.getElementsByClassName(`col__${id}`);
            const elementsArray: HTMLElement[] = Array.from(listElemtResizableBox) as HTMLElement[];
            elementsArray.map((element) => {
               console.log(element);
               element.style.width = `${d.width}`;
            });
         }}
      >
         {children}
      </Resizable>
   );
}
