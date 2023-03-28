'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';

import { useTimeoutCancelable } from '@/hooks/useTimeoutCancelable';
import { EMAIL, STATE } from '@/constants';
import { IconCheck, IconCopy, IconError } from '@/icons';
import { State } from '@/types';

export function Contact(props: {
  className?: string;
  classNames?: {
    button?: string;
    icon?: string;
    link?: string;
    linkBg?: string;
    text?: string;
    wrap?: string;
  };
  call?: string;
  iconLeft?: ReactNode;
  mailto?: string;
  web?: string;
}) {
  const [state, setState] = useState<State>(STATE.IDLE);
  const [copyState, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    if (copyState.error) setState(STATE.FAILURE);
    if (copyState.value) setState(STATE.SUCCESS);
  }, [copyState]);
  useTimeoutCancelable(() => setState(STATE.IDLE), state !== STATE.IDLE ? 1000 : null);

  let protocol;
  let value: string;
  if (props.call) {
    protocol = 'call:';
    value = props.call;
  } else if (props.web) {
    protocol = '';
    value = props.web;
  } else {
    protocol = 'mailto:';
    value = props.mailto || EMAIL;
  }

  return (
    <div>
      <div
        className={[
          'flex items-center text-xs border bg-neutral-100 py-1',
          props.className !== undefined ? props.className : 'inline-flex',
          props.classNames?.wrap !== undefined ? props.classNames?.wrap : 'rounded bg-bg-dark',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span
          className={[
            props.classNames?.link || 'px-2 py-1 border-r-2 border-bg',
            'flex items-center',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {props.iconLeft && (
            <span className={props.classNames?.icon || 'w-4 h-4 mr-2'}>{props.iconLeft}</span>
          )}
          <a
            className={['truncate', props.classNames?.text || 'block'].filter(Boolean).join(' ')}
            href={`${[protocol, value].filter(Boolean).join(':')}`}
          >
            {value}
          </a>
        </span>
        <button
          className={props.classNames?.button || 'px-2 flex-shrink-0'}
          type="button"
          onClick={() => copyToClipboard(value)}
        >
          {state === STATE.FAILURE ? (
            <IconError className="fill-red-500" />
          ) : state === STATE.SUCCESS ? (
            <IconCheck className="fill-green-500" />
          ) : (
            <IconCopy />
          )}
        </button>
      </div>
    </div>
  );
}
