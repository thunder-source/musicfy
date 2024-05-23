import { useAppSelector } from '@/hooks/reduxHandlers';
import React from 'react';

type Props = {};

export default function IsPlayerOpenBottomMargin({}: Props) {
  const { isActive } = useAppSelector((state) => state.player);
  return isActive && <div className='h-36 block'>&nbsp;</div>;
}
