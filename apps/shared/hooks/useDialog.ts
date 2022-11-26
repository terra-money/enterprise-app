import type { ComponentType } from 'react';
import { createElement, useCallback } from 'react';
import { useDialogContext } from '../dialog';
import { Dialog } from '../dialog/Dialog';

type CloseDialog<Return> = (returnValue: Return | undefined, opts?: Partial<{ closeAll: boolean }>) => void;

export type DialogProps<Param = void, Return = void> = Param & {
  closeDialog: CloseDialog<Return>;
};

export type OpenDialog<Param = void, Return = void> = (p: Param) => Promise<Return>;

export function useDialog<Param = void, Return = void>(
  DialogComponent: ComponentType<DialogProps<Param, Return>>
): OpenDialog<Param extends DialogProps<infer P, any> ? P : Param, Return | undefined> {
  const context = useDialogContext();

  const openDialog: OpenDialog<any, Return | undefined> = useCallback(
    async (props: Param) => {
      const { pushDialog, popDialog, popAllDialogs } = context;

      return new Promise<Return | undefined>((resolve) => {
        const closeDialog: CloseDialog<Return> = (returnValue, opts) => {
          if (opts?.closeAll) {
            popAllDialogs();
          } else {
            popDialog();
          }

          resolve(returnValue);
        };

        pushDialog((dialogs) => {
          const component = createElement(Dialog, {
            key: dialogs.length,
            index: dialogs.length,
            closeDialog,
            children: createElement(DialogComponent, {
              ...props,
              closeDialog,
            }),
          });
          return component;
        });
      });
    },
    [DialogComponent, context]
  );

  return openDialog;
}
